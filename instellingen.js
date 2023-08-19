// INSTELLINGEN
let canvas = document.createElement('canvas');
let c = canvas.getContext('2d');
canvas.width = CANVAS_BREEDTE;
canvas.height = CANVAS_HOOGTE;
document.body.appendChild(canvas);
let spelModus = SPEEL_MODUS

// afbeeldingen loaden
let nanonautAfbeelding = new Image();
nanonautAfbeelding.src = 'geanimeerdeNanonaut.png';
let achtergrondAfbeelding = new Image();
achtergrondAfbeelding.src = 'achtergrond.png';
let bosje1Afbeelding = new Image();
bosje1Afbeelding.src = 'bosje1.png';
let bosje2Afbeelding = new Image();
bosje2Afbeelding.src = 'bosje2.png';
let robotAfbeelding = new Image();
robotAfbeelding.src = 'geanimeerdeRobot.png';

let nanonoutSpriteSheet = {
    nrFramesPerRij: 5,
    spriteWidth: NANONAUT_BREEDTE,
    spriteHeight: NANONAUT_HOOGTE,
    image: nanonautAfbeelding
};

let robotSpriteSheet = {
    nrFramesPerRij: 3,
    spriteWidth: ROBOT_BREEDTE,
    spriteHeight: ROBOT_HOOGTE,
    image: robotAfbeelding
};

let nanonautX = CANVAS_BREEDTE / 2;
let nanonautY = GROND_Y - NANONAUT_HOOGTE;
let nanonautYSnelheid = 0;
let spatieBalkIsIngedrukt = false;
let nanonautIsInDeLucht = false;
let nanonautFrameNr = 0;
let spelFrameTeller = 0;
let nanonautGezondheid = NANONAUT_MAX_GEZONDHEID;
let cameraX = 0;
let nanonautOffset = 0;
let nanonautOffsetDelta = 0;

let robotData = [{
    x: 1200,
    y: GROND_Y - ROBOT_HOOGTE,
    snelheid: ROBOT_X_SNELHEID * (0.5 + Math.random()),
    frameNr: 0
}];

let bosjesData = genereerBosjes();

let cameraY = 0;

const nanonautBotsingRechthoek = {
    xOffset: 60,
    yOffset: 20,
    breedte: 50,
    hoogte: 200
}

const robotBotsingRechthoek = {
    xOffset: 50,
    yOffset: 20,
    breedte: 50,
    hoogte: 100
}

let schermSchudden = false;

window.addEventListener('keydown', onKeyDown)
window.addEventListener('keyup', onKeyUp)
window.addEventListener('load', start);

function start() {
    window.requestAnimationFrame(hoofdLus);
}

function genereerBosjes() {
    var gegenereerdeBosjesData =[];
    var bosjeX = 0;
    while (bosjeX < (2 * CANVAS_BREEDTE)) {
        var bosjeAfbeelding;
        if (Math.random() > 0.5) {
            bosjeAfbeelding = bosje1Afbeelding
        } else {
            bosjeAfbeelding = bosje2Afbeelding
        }
        gegenereerdeBosjesData.push({
            x: bosjeX,
            y: 80 + Math.random() * 20,
            image: bosjeAfbeelding
        })
        bosjeX += 150 + Math.random()*200
    }

    return gegenereerdeBosjesData;
}