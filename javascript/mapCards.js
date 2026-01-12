let gamesList = [];
let nextIndex = 0;

const PAGE_SIZE = 24;
const CARD_ROOT_MARGIN = "800px 0px";
const SENTINEL_ROOT_MARGIN = "1600px 0px";

const getContainer = () => document.getElementById("container");
const getSentinel = () => document.getElementById("infinite-scroll-sentinel");

const loadJSON = async () => {
  try {
    const response = await fetch("./javascript/games-list.json");
    if (!response.ok) throw new Error("Failed to load JSON");

    gamesList = await response.json();
    gamesList.sort(
      (a, b) => new Date(b.beatInfo[0].date) - new Date(a.beatInfo[0].date)
    );

    initializeGrid();
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
};

const buildCardElement = (game) => {
  const card = document.createElement("div");
  card.id = game.id;
  card.className = "game-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", game.name);
  card.setAttribute("aria-pressed", "false");

  const internal = document.createElement("div");
  internal.className = "internal-card";

  const front = document.createElement("button");
  front.type = "button";
  front.className = "front-side";
  front.style.backgroundImage = `url(${game.photos[0].banner})`;
  front.tabIndex = -1;
  front.setAttribute("aria-hidden", "true");

  const back = document.createElement("div");
  back.className = "back-side";
  back.style.backgroundImage = `url(${game.photos[0].bannerBlur})`;

  const desc = document.createElement("div");
  desc.className = "back-side-description";

  const icon = document.createElement("img");
  icon.src = game.photos[0].icon;
  icon.alt = `${game.name} icon`;
  icon.loading = "lazy";
  icon.decoding = "async";

  const title = document.createElement("h2");
  title.className = "text-bg";
  title.textContent = game.name;

  const meta = document.createElement("p");
  meta.className = "text-bg";
  const dev = document.createElement("span");
  dev.textContent = game.developer;
  const br = document.createElement("br");
  const rel = document.createElement("span");
  rel.textContent = game.releaseDate;
  meta.append(dev, br, rel);

  const beated = document.createElement("div");
  beated.className = "back-side-beated";

  const beatedTitle = document.createElement("h2");
  beatedTitle.textContent = "Beated Game";

  const beatedDate = document.createElement("p");
  beatedDate.textContent = game.beatInfo?.[0]?.date ?? "";

  const beatedHours = document.createElement("p");
  beatedHours.textContent =
    game.beatInfo?.[0]?.hours != null ? `${game.beatInfo[0].hours} hours` : "";

  beated.append(beatedTitle, beatedDate, beatedHours);
  desc.append(icon, title, meta, beated);
  back.appendChild(desc);
  internal.append(front, back);
  card.appendChild(internal);

  return card;
};

const renderPlaceholder = (index) => {
  const placeholder = document.createElement("div");
  placeholder.className = "game-card-placeholder";
  placeholder.dataset.index = String(index);
  return placeholder;
};

const appendNextBatch = () => {
  const container = getContainer();
  const sentinel = getSentinel();
  if (!container || !sentinel) return;
  if (nextIndex >= gamesList.length) return;

  const end = Math.min(nextIndex + PAGE_SIZE, gamesList.length);
  const fragment = document.createDocumentFragment();

  for (let i = nextIndex; i < end; i += 1) {
    const placeholder = renderPlaceholder(i);
    fragment.appendChild(placeholder);
    cardObserver.observe(placeholder);
  }

  container.insertBefore(fragment, sentinel);
  nextIndex = end;

  const stats = document.getElementById("stats");
  if (stats) {
    stats.textContent = `${Math.min(nextIndex, gamesList.length)} / ${gamesList.length}`;
  }
};

const onCardIntersect = (entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;

    const placeholder = entry.target;
    const index = Number(placeholder.dataset.index);
    const game = gamesList[index];
    if (!game) continue;

    placeholder.replaceWith(buildCardElement(game));
    cardObserver.unobserve(placeholder);
  }
};

const onSentinelIntersect = (entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    appendNextBatch();
    if (nextIndex >= gamesList.length) sentinelObserver.disconnect();
  }
};

const cardObserver = new IntersectionObserver(onCardIntersect, {
  rootMargin: CARD_ROOT_MARGIN,
  threshold: 0.01,
});

const sentinelObserver = new IntersectionObserver(onSentinelIntersect, {
  rootMargin: SENTINEL_ROOT_MARGIN,
  threshold: 0,
});

const initializeGrid = () => {
  const container = getContainer();
  const sentinel = getSentinel();
  if (!container || !sentinel) return;

  const toggleCard = (card) => {
    const next = !card.classList.contains("is-flipped");
    card.classList.toggle("is-flipped", next);
    card.setAttribute("aria-pressed", String(next));
  };

  container.addEventListener("click", (event) => {
    const target = event.target;
    const card = target?.closest?.(".game-card");
    if (!card) return;
    toggleCard(card);
  });

  container.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key !== "Enter" && key !== " ") return;
    const target = event.target;
    const card = target?.closest?.(".game-card");
    if (!card) return;
    event.preventDefault();
    toggleCard(card);
  });

  appendNextBatch();
  sentinelObserver.observe(sentinel);
};

loadJSON();
