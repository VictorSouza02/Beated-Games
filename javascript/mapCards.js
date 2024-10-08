let gamesList = [];

const loadJSON = async () => {
  try {
    const response = await fetch('./javascript/games-list.json');
    if (!response.ok) throw new Error('Failed to load JSON');

    gamesList = await response.json();
    gamesList.sort((a, b) => new Date(b.beatInfo[0].date) - new Date(a.beatInfo[0].date));

    initializeGrid(gamesList);
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
};

const initializeGrid = (gamesList) => {
  const container = document.getElementById('container');
  gamesList.forEach((game) => {
    const placeholder = document.createElement('div');
    placeholder.classList.add('game-card-placeholder');
    placeholder.setAttribute('data-id', game.id);
    container.appendChild(placeholder);

    observer.observe(placeholder);
  });
};

const renderCard = (game) => {
  return `
    <div id="${game.id}" class="game-card">
      <div class="internal-card">
        <div class="front-side" style="background-image: url(${game.photos[0].banner});"></div>
        <div class="back-side" style="background-image: url(${game.photos[0].bannerBlur});">
          <div class="back-side-description">
            <img src="${game.photos[0].icon}" alt="Game Icon">
            <h2 class="text-bg">${game.name}</h2> 
            <p class="text-bg">${game.developer}<br>${game.releaseDate}</p>
            <div class="back-side-beated">
              <h2>Beated Game</h2> 
              <p>${game.beatInfo[0].date}</p>
              <p>${game.beatInfo[0].hours} hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const placeholder = entry.target;
      const gameId = placeholder.getAttribute('data-id');

      const game = gamesList.find(g => g.id === gameId);
      if (game) {
        placeholder.outerHTML = renderCard(game);
      }

      observer.unobserve(placeholder);
    }
  });
});

loadJSON();
