// ================================================================ //
// DISPENSERS

function saveDispenserTimers(dTimers) {
    const timersData = dTimers.map(timer => timer.toJSON());
    localStorage.setItem('dTimers', JSON.stringify(timersData));
    console.log("Dispenser Timers saved to local storage.");
}

function loadDispenserTimers(dTimers) {
    const timersData = JSON.parse(localStorage.getItem('dTimers')) || [];
    if(timersData.length === 0){
        console.log('No timers to load from local storage.');
        return;
    }
    
    dTimers.forEach((timer, i) => {
        timer.fromJSON(timersData[i]);
        
        if (timer.isRunning){
            timer.isRunning = false;
            timer.startTimer();
            updateDispenserCardBtns('#'.concat(timer.name.concat("_dCard")));
        }
    });
    
    console.log('Timers loaded from local storage.');
    return;
}

const dNames = ["honey", "straw", "blue", "treat", "ant_pass", "royal_jelly", "robo_pass", "glue", "coconut"];
const dDurations = [60, 240, 240, 60, 120, 1320, 1320, 1320, 240];
const dTimers = dNames.map((name, i) => new CountdownTimer(name, dDurations[i], "#".concat(name.concat("_dTimer"))));

function updateDispenserCardBtns(cardId, reset) {
    const cardFooter = $(cardId).children(".card-footer");
    const cardFooterBtns = cardFooter.children("button");
    const startBtn = cardFooter.children(":eq(2)");

    if (reset == null) {
        cardFooter.addClass("btn-group");
        cardFooterBtns.removeClass("d-none");
        startBtn.addClass("d-none");

    } else {
        cardFooter.removeClass("btn-group");
        cardFooterBtns.addClass("d-none");
        startBtn.removeClass("d-none");
    }
}

//
//
//

// ================================================================ //
// MOBS - planned;

//
//
//

// ================================================================ //
// BLENDER - planned;

//
//
//

// ================================================================ //
// PLANTERS - planned;

//
//
//

// ================================================================ //
// OTHERS - planned;
// other timers that don't fit anywhere

//
//
//

// ================================================================ //

//
//
//
//
//
//
//
//
//
//

// ================================================================ //
$(document).ready(function () {
    // ============================================================ //
    // SAVING // LOADING
    loadDispenserTimers(dTimers);

    setInterval(() => {
        saveDispenserTimers(dTimers);
    }, 1 * 60000);

    // ============================================================ //
    // DISPENSERS

    dTimers.forEach((timer) => {
        // set dtimers to update spans each second;
        setInterval(function () {
            $(timer.spanId).text(timer.formatTime());
            if (timer.finished) {
                updateDispenserCardBtns('#'.concat(timer.name.concat("_dCard")), true);
                timer.resetTimer();
            }
        }, 100);

        // links each html buttons with their respective timer js methods
        // start_btn
        $(timer.spanId.concat("_start")).on('click', function () {
            timer.startTimer();
            updateDispenserCardBtns('#'.concat(timer.name.concat("_dCard")));
        });

        // -10min_btn
        $(timer.spanId.concat("_aux1")).on('click', function () {
            timer.subMinutes(10);
        });

        // -5min_btn
        $(timer.spanId.concat("_aux2")).on('click', function () {
            timer.subMinutes(5);
        });

        // reset_btn
        $(timer.spanId.concat("_reset")).on('click', function () {
            timer.resetTimer();
            updateDispenserCardBtns('#'.concat(timer.name.concat("_dCard")), true);
        });
    });
});