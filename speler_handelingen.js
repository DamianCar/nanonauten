// SPELER-HANDELINGEN
function onKeyDown(event) {
    if (event.keyCode === SPATIEBALK_CODE || event.keyCode === BOVEN_PIJL_CODE) {
        spatieBalkIsIngedrukt = true;
    }
    if (event.keyCode === LINKS_PIJL_CODE) {
        nanonautOffsetDelta = -10;
    }
    if (event.keyCode === RECHTS_PIJL_CODE) {
        nanonautOffsetDelta = 10;
    }
    if (event.keyCode === BENEDEN_PIJL_CODE) {
        if (!nanonautIsInDeLucht && !nanonautIsSliden && (nanonautMana >= NANONAUT_SLIDEN_MANA)) {
            nanonautIsSliden = true;
            nanonautMana -= NANONAUT_SLIDEN_MANA;
        }
    }
}

function onKeyUp(event) {
    if (event.keyCode === SPATIEBALK_CODE || event.keyCode === BOVEN_PIJL_CODE) {
        spatieBalkIsIngedrukt = false;
    }
    if (event.keyCode === LINKS_PIJL_CODE) {
        nanonautOffsetDelta = 0;
    }
    if (event.keyCode === RECHTS_PIJL_CODE) {
        nanonautOffsetDelta = 0;
    }
}

function onKeyPress(event) {
    if (event.keyCode === PAUSE_CODE) {
        if (spelModus === PAUZE_SPELMODUS) {
            spelModus = SPEEL_MODUS;
        } else {
            spelModus = PAUZE_SPELMODUS;
        }
    }
}
