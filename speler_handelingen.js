// SPELER-HANDELINGEN
function onKeyDown(event) {
    if (event.keyCode === SPATIEBALK_CODE) {
        spatieBalkIsIngedrukt = true;
    }
    if (event.keyCode === 37) {
        nanonautOffsetDelta = -10;
    }
    if (event.keyCode === 39) {
        nanonautOffsetDelta = 10;
    }

}
function onKeyUp(event) {
    if (event.keyCode === SPATIEBALK_CODE) {
        spatieBalkIsIngedrukt = false;
    }
    if (event.keyCode === 37) {
        nanonautOffsetDelta = 0;
    }
    if (event.keyCode === 39) {
        nanonautOffsetDelta = 0;
    }
}
