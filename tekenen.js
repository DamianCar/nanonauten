
// TEKENEN
function draw() {
    let schuddendeCameraX = cameraX
    let schuddendeCameraY = cameraY
    if (schermSchudden) {
        schuddendeCameraX += (Math.random() - 0.5) * SCHERMSCHUD_RADIUS
        schuddendeCameraY += (Math.random() - 0.5) * SCHERMSCHUD_RADIUS
    }

    //teken de lucht
    c.fillStyle = 'LightSkyBlue';
    c.fillRect(0, 0, CANVAS_BREEDTE, GROND_Y - 40);

    //teken de achtergrond
    const achtergrondX = -(schuddendeCameraX % ACHTERGROND_BREEDTE)
    c.drawImage(achtergrondAfbeelding, achtergrondX, -210)
    c.drawImage(achtergrondAfbeelding, achtergrondX + ACHTERGROND_BREEDTE, -210)

    //teken de grond
    c.fillStyle = 'forestgreen';
    c.fillRect(0, GROND_Y -40, CANVAS_BREEDTE, CANVAS_HOOGTE - GROND_Y + 40)

    // teken de bosjes
    for (let i=0; i<bosjesData.length; i++) {
        c.drawImage(bosjesData[i].image, bosjesData[i].x - schuddendeCameraX, GROND_Y - bosjesData[i].y - schuddendeCameraY)
    }

    // teken de robots
    for (let i=0; i<robotData.length; i++) {
        tekenGeanimeerdeSprite(robotData[i].x - schuddendeCameraX, robotData[i].y - schuddendeCameraY,
            robotData[i].frameNr, robotSpriteSheet, robotBotsingRechthoek)
    }

    // teken de nanonaut
    tekenGeanimeerdeSprite(nanonautX - schuddendeCameraX + nanonautOffset, nanonautY - schuddendeCameraY,
        nanonautFrameNr, nanonoutSpriteSheet, nanonautBotsingRechthoek)

    // laat de afstand zien die de Nanonaut heeft afgelegd.
    const nanonautAfstand = nanonautX / 100;
    c.fillStyle = "black";
    c.font = "48px sans-serif";
    c.fillText(nanonautAfstand.toFixed(0) + 'm', 20, 40);


    // teken de gezondheid
    c.fillStyle = "red"
    c.fillRect(400, 10, nanonautGezondheid / NANONAUT_MAX_GEZONDHEID * 380, 20);
    c.strokeStyle = "red"
    c.strokeRect(400, 10, 380, 20)

    // teken de gezondheid
    c.fillStyle = "green"
    c.fillRect(400, 40, nanonautMana / NANONAUT_MAX_MANA * 380, 20);
    c.strokeStyle = "green"
    c.strokeRect(400, 40, 380, 20)

    if (spelModus === GAME_OVER_SPELMODUS) {
        c.fillStyle = 'black'
        c.font = '96px sans-serif'
        c.fillText('GAME OVER', 120, 300)
    }

    if (spelModus === PAUZE_SPELMODUS) {
        c.fillStyle = 'black'
        c.font = '96px sans-serif'
        c.fillText('PAUZE', 120, 300)
    }
}

function tekenGeanimeerdeSprite(schermX, schermY, frameNr, spriteSheet, botsingRechthoek) {
    const spriteSheetRij =  Math.floor(frameNr / spriteSheet.nrFramesPerRij);
    const spriteSheetKolom = frameNr % spriteSheet.nrFramesPerRij;
    const spriteSheetX = spriteSheetKolom * spriteSheet.spriteWidth;
    const spriteSheetY = spriteSheetRij * spriteSheet.spriteHeight;
    c.drawImage(spriteSheet.image, spriteSheetX, spriteSheetY,
        spriteSheet.spriteWidth, spriteSheet.spriteHeight,
        schermX, schermY, spriteSheet.spriteWidth, spriteSheet.spriteHeight)
    //c.fillStyle = "blue"
    //c.fillRect(schermX + botsingRechthoek.xOffset, schermY + botsingRechthoek.yOffset,botsingRechthoek.breedte, botsingRechthoek.hoogte)
}
