// UPDATEN
function update() {
    nanonautY = nanonautY + nanonautYSnelheid;
    nanonautYSnelheid = nanonautYSnelheid + NANONAUT_Y_VERSNELLING;

    nanonautX = nanonautX + NANONAUT_X_SNELHEID;

    nanonautOffset += nanonautOffsetDelta;
    if (nanonautOffset < -150)
        nanonautOffset = -150;
    if (nanonautOffset > 450)
        nanonautOffset = 450;

    if (nanonautY > (GROND_Y - NANONAUT_HOOGTE)) {
        nanonautY = GROND_Y - NANONAUT_HOOGTE;
        nanonautYSnelheid = 0;
        nanonautIsInDeLucht = false;
    }

    if (spatieBalkIsIngedrukt && !nanonautIsInDeLucht) {
        nanonautYSnelheid = -NANONAUT_SPRONG_SNELHEID;
        nanonautIsInDeLucht = true;
    }

    // update de camera
    cameraX = nanonautX - 150
    spelFrameTeller = spelFrameTeller + 1;

    if (!nanonautIsInDeLucht) {
        if (spelFrameTeller % NANONAUT_ANIMATIE_SNELHEID === 0) {
            nanonautFrameNr = nanonautFrameNr + 1;
            if (nanonautFrameNr >= NANONAUT_NR_ANIMATIEFRAMES) {
                nanonautFrameNr = 0;
            }
        }
    }

    // update bosjes
    for (let i = 0; i < bosjesData.length; i++) {
        if (bosjesData[i].x - cameraX < - CANVAS_BREEDTE) {
            bosjesData[i].x += 2 * CANVAS_BREEDTE + 150;
        }
    }

    // update robots
    schermSchudden = false;
    let botsing = updateRobots();
    if (botsing) {
        schermSchudden = true;
        if (nanonautGezondheid > 0)  {
            nanonautGezondheid -= 0.5;
        } else {
            spelModus = GAME_OVER_SPELMODUS
            schermSchudden = false
        }
    }


}

function overlappenNanonautEnRobotOpEenAs(nanonautDichtbijX, nanonautVerX, robotDichtbijX, robotVerX) {
    const nanonautOverlaptRobotDichtbij = (nanonautVerX >= robotDichtbijX) && (nanonautVerX <= robotVerX);
    const nanonautOverlaptRobotVer = (nanonautDichtbijX >= robotDichtbijX) && (nanonautDichtbijX <= robotVerX);
    const nanonautOverlaptRobotHelemaal = (nanonautDichtbijX <= robotDichtbijX) && (nanonautVerX >= robotVerX);
    return nanonautOverlaptRobotDichtbij || nanonautOverlaptRobotVer || nanonautOverlaptRobotHelemaal;
}

function overlapenNanonautRobot(nanonautX, nanonautY, nanonautBreedte, nanonautHoogte,
                                robotX, robotY, robotBreedte, robotHoogte) {
    const nanonautOverlaptRobotOpXAs = overlappenNanonautEnRobotOpEenAs(nanonautX, nanonautX + nanonautBreedte,
        robotX, robotX + robotBreedte);
    const nanonautOverlaptRobotOpYAs = overlappenNanonautEnRobotOpEenAs(nanonautY, nanonautY + nanonautHoogte,
        robotY, robotY + robotHoogte);
    return nanonautOverlaptRobotOpXAs && nanonautOverlaptRobotOpYAs
}

function updateRobots() {
    let nanonautBotsteOpEenRobot = false;
    for (let i = 0; i < robotData.length; i++) {
        if (overlapenNanonautRobot(nanonautX + nanonautBotsingRechthoek.xOffset + nanonautOffset,
            nanonautY + nanonautBotsingRechthoek.yOffset, nanonautBotsingRechthoek.breedte,
            nanonautBotsingRechthoek.hoogte, robotData[i].x + robotBotsingRechthoek.xOffset,
            robotData[i].y + robotBotsingRechthoek.yOffset, robotBotsingRechthoek.breedte,
            robotBotsingRechthoek.hoogte))
        {
            nanonautBotsteOpEenRobot = true;
        }

        robotData[i].x -= robotData[i].snelheid;
        if (spelFrameTeller % ROBOT_ANIMATIE_SNELHEID === 0) {
            robotData[i].frameNr += 1;
            if (robotData[i].frameNr >= ROBOT_NR_ANIMATIEFRAMES) {
                robotData[i].frameNr = 0;
            }
        }
    }
    let robotIndex = 0;
    while (robotIndex < robotData.length) {
        if (robotData[robotIndex].x < cameraX - ROBOT_BREEDTE) {
            robotData.splice(robotIndex, 1);
        } else {
            robotIndex += 1;
        }
    }
    if (robotData.length < MAX_ACTIEVE_ROBOTS) {
        const laatsteRobotX = robotData[robotData.length - 1].x;
        const nieuweRobotX = laatsteRobotX + MIN_AFSTAND_TUSSEN_ROBOTS + Math.random() * (
            MAX_AFSTAND_TUSSEN_ROBOTS - MIN_AFSTAND_TUSSEN_ROBOTS)
        robotData.push({
            x: nieuweRobotX,
            y: GROND_Y - ROBOT_HOOGTE,
            snelheid: ROBOT_X_SNELHEID * (0.5 + Math.random()),
            frameNr: 0
        });
    }
    return nanonautBotsteOpEenRobot;
}