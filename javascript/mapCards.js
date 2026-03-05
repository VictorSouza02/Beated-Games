let gamesList = [];

const PAGE_SIZE = 12;
let renderedCount = 0;

function escapeHtml(str) {
  if (str == null) return '';
  const s = String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseBeatDate(beatDateStr) {
  const parts = String(beatDateStr).trim().split(/[/-]/);
  const month = parseInt(parts[0], 10) || 1;
  const year = parseInt(parts[1], 10) || 0;
  return new Date(year, month - 1, 1).getTime();
}

function preloadFirstBanner() {
  if (gamesList.length === 0) return;
  const first = gamesList[0];
  if (!first || !first.banner) return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = first.banner;
  document.head.appendChild(link);
}

const loadJSON = async () => {
  try {
    const response = await fetch('./javascript/games-list.json');
    if (!response.ok) throw new Error('Failed to load JSON');
    const data = await response.json();
    gamesList = data.sort((a, b) => parseBeatDate(b.beatDate) - parseBeatDate(a.beatDate));
    preloadFirstBanner();
    initializeGrid();
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
};

function getSentinel() {
  return document.getElementById('scroll-sentinel');
}

function createSentinel() {
  const sentinel = document.createElement('div');
  sentinel.id = 'scroll-sentinel';
  sentinel.className = 'scroll-sentinel';
  return sentinel;
}

function loadMore(container) {
  const start = renderedCount;
  const end = Math.min(start + PAGE_SIZE, gamesList.length);
  for (let i = start; i < end; i++) {
    const placeholder = document.createElement('div');
    placeholder.classList.add('game-card-placeholder');
    placeholder.dataset.index = String(i);
    const sentinel = getSentinel();
    container.insertBefore(placeholder, sentinel);
    cardObserver.observe(placeholder);
  }
  renderedCount = end;
  if (renderedCount >= gamesList.length) {
    const sentinel = getSentinel();
    if (sentinel) {
      sentinel.remove();
      if (sentinelObserver) sentinelObserver.disconnect();
    }
  }
}

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function formatBeatDateEn(beatDateStr) {
  const parts = String(beatDateStr).trim().split(/[/-]/);
  const month = parseInt(parts[0], 10);
  const year = parts[1] || new Date().getFullYear();
  const monthName = MONTHS_EN[month - 1] || MONTHS_EN[0];
  return `${monthName} - ${year}`;
}

const initializeGrid = () => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  renderedCount = 0;
  loadMore(container);
  const sentinel = createSentinel();
  container.appendChild(sentinel);
  sentinelObserver.observe(sentinel);
};

const renderCard = (game, index, staggerIndex = 0) => {
  const beatDateEn = formatBeatDateEn(game.beatDate);
  const name = escapeHtml(game.name);
  const developer = escapeHtml(game.developer);
  const releaseDate = escapeHtml(game.releaseDate);
  const beatDateEsc = escapeHtml(beatDateEn);
  const beatHours = escapeHtml(game.beatHours);
  const banner = escapeHtml(game.banner);
  const icon = escapeHtml(game.icon);
  const isFirst = index === 0;
  const imgAttrs = isFirst
    ? ' width="40" height="40" fetchpriority="high"'
    : ' width="40" height="40"';
  const logoAlt = name ? `${name} logo` : '';
  const ariaLabel = `Ver detalhes de ${name}`;
  return `
  <div id="game-${index}" class="game-card" data-stagger="${staggerIndex}" style="transition-delay: ${staggerIndex * 50}ms;" role="button" tabindex="0" aria-label="${ariaLabel}">
    <div class="internal-card">
      <div class="front-side" style="background-image: url(${banner});"></div>
      <div class="back-side">
        <div class="back-side-header" style="background-image: url(${banner});">
          <div class="back-side-header-overlay"></div>
          <div class="back-side-header-content">
            <img class="back-side-logo" src="${icon}" alt="${logoAlt}"${imgAttrs}>
            <div class="back-side-title-wrap">
              <h2 class="back-side-title">${name}</h2>
            </div>
          </div>
        </div>
        <div class="back-side-details">
          <div class="back-side-detail-row">
            <span class="back-side-detail-label">Developer</span>
            <span class="back-side-detail-value back-side-detail-value--truncate">${developer}</span>
          </div>
          <div class="back-side-detail-row">
            <span class="back-side-detail-label">Release</span>
            <span class="back-side-detail-value">${releaseDate}</span>
          </div>
          <div class="back-side-beated">
            <div class="back-side-beated-shine"></div>
            <span class="back-side-beated-label">Beated</span>
            <span class="back-side-beated-date">${beatDateEsc}</span>
            <span class="back-side-beated-hours">${beatHours} hours</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
};

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const placeholder = entry.target;
      const index = parseInt(placeholder.dataset.index, 10);
      const game = gamesList[index];
      if (game == null) return;
      const staggerIndex = index % PAGE_SIZE;
      const html = renderCard(game, index, staggerIndex);
      placeholder.insertAdjacentHTML('afterend', html);
      const card = placeholder.nextElementSibling;
      cardObserver.unobserve(placeholder);
      placeholder.remove();
      requestAnimationFrame(() => card.classList.add('card-visible'));
    });
  },
  { rootMargin: '80px' }
);

let sentinelObserver = null;
sentinelObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const container = document.getElementById('container');
      loadMore(container);
    });
  },
  { rootMargin: '200px', threshold: 0 }
);

function handleCardActivation(card) {
  if (!card) return;
  card.classList.toggle('card-flipped');
}

function setupCardFlip() {
  const container = document.getElementById('container');
  if (!container) return;
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.game-card');
    handleCardActivation(card);
  });
  container.addEventListener('keydown', (e) => {
    const card = e.target.closest('.game-card');
    if (!card) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardActivation(card);
    }
  });
}

setupCardFlip();
loadJSON();
