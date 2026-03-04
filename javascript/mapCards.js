let gamesList = [];

const loadJSON = async () => {
  try {
    const response = await fetch('./javascript/games-list.json');
    if (!response.ok) throw new Error('Failed to load JSON');
    gamesList = (await response.json()).sort(
      (a, b) => new Date(b.beatDate) - new Date(a.beatDate)
    );
    initializeGrid();
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
};

const initializeGrid = () => {
  const container = document.getElementById('container');
  gamesList.forEach((game, i) => {
    const placeholder = document.createElement('div');
    placeholder.classList.add('game-card-placeholder');
    placeholder.dataset.index = i;
    container.appendChild(placeholder);
    observer.observe(placeholder);
  });
};

const renderCard = (game, index) => `
  <div id="game-${index}" class="game-card">
    <div class="internal-card">
      <div class="front-side" style="background-image: url(${game.banner});"></div>
      <div class="back-side">
        <div class="back-side-bg" style="background-image: url('${game.banner}');"></div>
        <div class="back-side-description">
          <img src="${game.icon}" alt="Game Icon">
          <h2 class="text-bg">${game.name}</h2>
          <p class="text-bg">${game.developer}<br>${game.releaseDate}</p>
          <div class="back-side-beated">
            <h2>Beated Game</h2>
            <p>${game.beatDate}</p>
            <p>${game.beatHours} hours</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const placeholder = entry.target;
    const index = parseInt(placeholder.dataset.index, 10);
    const game = gamesList[index];
    if (game != null) {
      placeholder.outerHTML = renderCard(game, index);
      observer.unobserve(placeholder);
    }
  });
});

loadJSON();
