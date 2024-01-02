// ================================================================ //
// DISPENSERS

function saveDispenserTimers() {
    const timersData = dispenser_timers.map(timer => timer.toJSON());
    
    localStorage.setItem('dispenser_timers', JSON.stringify(timersData));
    console.log("Dispensers - Timers Saved :)");
}

function loadDispenserTimers() {
    const timersData = JSON.parse(localStorage.getItem('dispenser_timers')) || [];
    if (timersData.length === 0) {
        console.log('Dispensers - No Timers to load :(');
        return;
    }

    dispenser_timers.forEach((timer, i) => {
        timer.fromJSON(timersData[i]);

        // Check if the timer is running before resetting its state
        if (timer.isRunning) {
            const remainingTime = timer.remainingTime;
            timer.isRunning = false;
            timer.startTimer();
            timer.remainingTime = remainingTime; // Set the remaining time back to the loaded value
        }
    });

    console.log('Dispensers - Timers loaded :)');
}


const dispenser_names = ["honey", "straw", "blue", "treat", "ant_pass", "royal_jelly", "robo_pass", "glue", "coconut"];
const dispenser_durations = [60, 240, 240, 60, 120, 1320, 1320, 1320, 240];
const dispenser_timers = dispenser_names.map((name, i) => new CountdownTimer(name, dispenser_durations[i], "#".concat(name.concat("_dispenser_timer"))));

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
    // DISPENSERS

    dispenser_timers.forEach((timer) => {
        // set dispenser_timers to update spans each second;
        setInterval(function () {
            $(timer.spanId).text(timer.formatTime());
            
            // if (timer.finished) {
            //     toggleCardBtns('#'.concat(timer.name.concat("_dispenser_card")));
            //     timer.resetTimer();
            // }
        }, 100);

        // links each html buttons with their respective timer js methods
        // start_btn
        $(timer.spanId.concat("_start")).on('click', function () {
            timer.startTimer();
            // toggleCardBtns('#'.concat(timer.name.concat("_dispenser_card")), true);
        });

        // -10min_btn
        $(timer.spanId.concat("_aux1")).on('click', function () { timer.subMinutes(10); });

        // -5min_btn
        $(timer.spanId.concat("_aux2")).on('click', function () { timer.subMinutes(5); });

        // reset_btn
        $(timer.spanId.concat("_reset")).on('click', function () {
            timer.resetTimer();
            // toggleCardBtns('#'.concat(timer.name.concat("_dispenser_card")));
        });
    });

    // ============================================================ //
    // GENERAL


    // ============================================================ //
    // SAVING // LOADING
    loadDispenserTimers(dispenser_timers);

    setInterval(() => { saveDispenserTimers(dispenser_timers); }, 1 * 1000);

});