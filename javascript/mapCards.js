/* JSON */
import lista from './games-list.json' assert {type: 'json'}
/* Fim JSON */

/* Adicionar itens */
const inicializarGrid = () => {
    const adicionarItens = document.getElementById('steam-grid')
    lista['games'].map((val) => {
        if (val['steam'] === true) {
            adicionarItens.innerHTML += `
            <div id="`+ val['id'] + `" class="game-card">
                <div class="internal-card">
                    <div class="front-side" style="background-image: url(`+ val['fotos'][0]['banner'] + `);"></div>
                            
                    <div class="back-side" style="background-image: url(`+ val['fotos'][0]['bannerBlur'] + `);">
                        <div class="back-side-description">
                        <img src="`+ val['fotos'][0]['icone'] + `">
                        <h2 class="text-bg">`+ val['nome'] + `</h2> 
                        <p class="text-bg">`+ val['Desenvolvedora'] + `<br>`+ val['dataDeLancamento'] + `</p>

                            <div class="back-side-beated">
                                <img src="img/icons/steam-icon.svg">
                                <h2>Beated Game</h2> 
                                <p><s>`+ val['beatInfo'][0]['data'] + `</s></p>
                                <p>`+ val['beatInfo'][0]['horas'] + ` horas</p>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        } 
        
        else {
            const adicionarNonSteam = document.getElementById('non-steam-grid')
            adicionarNonSteam.innerHTML += `
            <div id="`+ val['id'] + `" class="game-card">
                <div class="internal-card">
                    <div class="front-side" style="background-image: url(`+ val['fotos'][0]['banner'] + `);"></div>
                            
                    <div class="back-side" style="background-image: url(`+ val['fotos'][0]['bannerBlur'] + `);">
                        <div class="back-side-description">
                        <img src="`+ val['fotos'][0]['icone'] + `">
                        <h2 class="text-bg">`+ val['nome'] + `</h2> 
                        <p class="text-bg">`+ val['Desenvolvedora'] + `<br>`+ val['dataDeLancamento'] + `</p>

                            <div class="back-side-beated">
                                <img src="` + val['fotos'][0]['icone'] + `">
                                <h2>Beated Game</h2> 
                                <p><s>`+ val['beatInfo'][0]['data'] + `</s></p>
                                <p>`+ val['beatInfo'][0]['horas'] + ` horas</p>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    })
}

inicializarGrid()
/* FIM Adicionar itens */