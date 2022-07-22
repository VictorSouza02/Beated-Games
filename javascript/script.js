/* JSON */
const games = [
    {
        nome : 'Gun',
        data : '12/2019',
        img : '../img/banner/gun.jpg',
        id : '1game',
        steam : true
    },

    {
        nome : 'Half-Life',
        data : '03/2020',
        img : '../img/banner/half-life.jpg',
        id : '2game',
        steam : true
    },

    {
        nome : 'Katana ZERO',
        data : '04/2020',
        img : '../img/banner/katana-zero.jpg',
        id : '3game',
        steam : true
    },

    {
        nome : 'The Crew 2',
        data : '07/2020',
        img : '../img/banner/the-crew-2.jpg',
        id : '4game',
        steam : true
    },

    {
        nome : 'Metal Slug 3',
        data : '08/2020',
        img : '../img/banner/metal-slug-3.jpg',
        id : '5game',
        steam : true
    },

    {
        nome : 'The Room',
        data : '10/2020',
        img : '../img/banner/the-room.jpg',
        id : '6game',
        steam : true
    },

    {
        nome : 'Portal',
        data : '10/2020',
        img : '../img/banner/portal.jpg',
        id : '7game',
        steam : true
    },

    {
        nome : 'Resident Evil 4',
        data : '11/2020',
        img : '../img/banner/resident-evil-4.jpg',
        id : '8game',
        steam : true
    },

    {
        nome : 'Need For Speed',
        data : '12/2020',
        img : '../img/banner/need-for-speed.jpg',
        id : '9game',
        steam : true
    },

    {
        nome : 'Naruto Shippuden: Ultimate Ninja STORM 4',
        data : '12/2020',
        img : '../img/banner/naruto-shippuden-ultimate-ninja-storm-4.jpg',
        id : '10game',
        steam : true
    },

    {
        nome : 'Punch Club',
        data : '12/2020',
        img : '../img/banner/punch-club.jpg',
        id : '12game',
        steam : true
    },

    {
        nome : 'Portal 2',
        data : '01/2021',
        img : '../img/banner/portal-2.jpg',
        id : '12game',
        steam : true
    },

    {
        nome : 'Far Cry 4',
        data : '05/2021',
        img : '../img/banner/far-cry-4.jpg',
        id : '13game',
        steam : true
    },

    {
        nome : 'CarX Drift Racing Online',
        data : '06/2021',
        img : '../img/banner/carx-drift-racing-online.jpg',
        id : '14game',
        steam : true
    },

    {
        nome : 'Samurai Shodown V Special',
        data : '06/2021',
        img : '../img/banner/samurai-shodown-v-special.jpg',
        id : '15game',
        steam : true
    },

    {
        nome : 'Grand Theft Auto V',
        data : '09/2021',
        img : '../img/banner/grand-theft-auto-v.jpg',
        id : '16game',
        steam : true
    },

    {
        nome : 'Please, Don`t Touch Anything',
        data : '10/2021',
        img : '../img/banner/please-dont-touch-anything.jpg',
        id : '17game',
        steam : true
    },

    {
        nome : 'Grand Theft Auto IV',
        data : '10/2021',
        img : '../img/banner/grand-theft-auto-iv.jpg',
        id : '18game',
        steam : true
    },

    {
        nome : 'Sniper: Ghost Warrior',
        data : '11/2021',
        img : '../img/banner/sniper-ghost-warrior.jpg',
        id : '19game',
        steam : true
    },

    {
        nome : 'LEGO The Lord of the Rings',
        data : '11/2021',
        img : '../img/banner/lego-the-lord-of-the-rings.jpg',
        id : '20game',
        steam : true
    },

    {
        nome : 'Bully: Scholarship Edition',
        data : '11/2021',
        img : '../img/banner/bully-scholarship-edition.jpg',
        id : '21game',
        steam : true
    },

    {
        nome : 'Metal Gear Solid V: The Phanton Pain',
        data : '12/2021',
        img : '../img/banner/metal-gear-solid-v-the-phanton-pain.jpg',
        id : '22game',
        steam : true
    },

    {
        nome : 'Metal Gear Solid V: Ground Zeroes',
        data : '12/2021',
        img : '../img/banner/metal-gear-solid-v-ground-zeroes.jpg',
        id : '23game',
        steam : true
    },

    {
        nome : 'Dying Light',
        data : '12/2021',
        img : '../img/banner/dying-light.jpg',
        id : '24game',
        steam : true
    },

    {
        nome : 'The Elder Scrolls V: Skyrim Special Edition',
        data : '12/2021',
        img : '../img/banner/the-elder-scrolls-v-skyrim-special-edition.jpg',
        id : '25game',
        steam : true
    },

    {
        nome : 'My Hero One`s Justice',
        data : '01/2022',
        img : '../img/banner/my-hero-ones-justice.jpg',
        id : '26game',
        steam : true
    },

    {
        nome : 'Crono Trigger',
        data : '01/2022',
        img : '../img/banner/crono-trigger.jpg',
        id : '27game',
        steam : true
    },

    {
        nome : 'Metal Gear Rising: Revengeance',
        data : '02/2022',
        img : '../img/banner/metal-gear-rising-revengeance.jpg',
        id : '28game',
        steam : true
    },

    {
        nome : 'God of War',
        data : '02/2022',
        img : '../img/banner/god-of-war.jpg',
        id : '29game',
        steam : true
    },

    {
        nome : 'Resident Evil 2',
        data : '07/2022',
        img : '../img/banner/resident-evil-2.jpg',
        id : '30game',
        steam : true
    },

    {
        nome : 'Skate 3',
        data : '03/2022',
        img : '../img/banner/skate-3.jpg',
        id : '31game',
        steam : false
    },

    {
        nome : 'Guitar Hero III: Legends of Rock',
        data : '06/2022',
        img : '../img/banner/guitar-hero-3-legends-of-rock.jpg',
        id : '32game',
        steam : false
    },

    {
        nome : 'Minecraft',
        data : '07/2022',
        img : '../img/banner/minecraft.jpg',
        id : '33game',
        steam : false
    }
]

/* Fim JSON */

/* Adicionar 'Cards' */
inicializarGrid = () => {
    const adicionarItens = document.getElementById('grid')
    games.map((val) => {
        if(val.steam===true){
            adicionarItens.innerHTML+=`
            <div id='`+val.id+`'  
            class='item' 
            style='background-image: url(`+val.img+`);'>
            </div>
        `;
        }else{
            const adicionarNonSteam = document.getElementById('grid-non-steam')
            adicionarNonSteam.innerHTML+=`
            <div id='`+val.id+`'  
            class='item' 
            style='background-image: url(`+val.img+`);'>
            </div>
        `;
            

        }
    })
}

inicializarGrid()
/* Fim Adicionar 'Cards' */
