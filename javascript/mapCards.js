/* JSON */
import lista from './games-list.json' assert {type: 'json'}

// Ordenar a lista de jogos com base na data de conclusão (beatInfo)
lista.sort((a, b) => {
  // Convertendo as datas para objetos Date para facilitar a comparação
  const dateA = new Date(a.beatInfo[0].date);
  const dateB = new Date(b.beatInfo[0].date);

  // Ordenando de forma decrescente
  return dateB - dateA;
});

/* Fim JSON */

/* Adicionar itens */
const inicializarGrid = () => {
    const adicionarItens = document.getElementById('container')
    lista.map((val) => {
      adicionarItens.innerHTML += `
        <div id="`+ val['id'] + `" class="game-card">
          <div class="internal-card">
            <div class="front-side" style="background-image: url(`+ val['photos'][0]['banner'] + `);"></div>
                            
            <div class="back-side" style="background-image: url(`+ val['photos'][0]['bannerBlur'] + `);">
              <div class="back-side-description">
                <img src="`+ val['photos'][0]['icon'] + `">
                <h2 class="text-bg">`+ val['name'] + `</h2> 
                <p class="text-bg">`+ val['developer'] + `<br>` + val['releaseDate'] + `</p>

                <div class="back-side-beated">
                  <h2>Beated Game</h2> 
                  <p>`+ val['beatInfo'][0]['date'] + `</p>
                  <p>`+ val['beatInfo'][0]['hours'] + ` hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    })
}

inicializarGrid()
/* FIM Adicionar itens */