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
const dispenser_timers = dispenser_names.map((name, i) => new CountdownTimer(name, dispenser_durations[i], "dispenser", `#${name}_dispenser_timer`));

// ================================================================ //
// MOBS

function saveMobsTimers() {
    const timersData = mobs_timers.map(timer => timer.toJSON());

    localStorage.setItem('mobs_timers', JSON.stringify(timersData));
    console.log("Mobs - Timers Saved :)");
}

function loadMobsTimers() {
    const timersData = JSON.parse(localStorage.getItem('mobs_timers')) || [];
    if (timersData.length === 0) {
        console.log('Mobs - No Timers to load :(');
        return;
    }

    mobs_timers.forEach((timer, i) => {
        timer.fromJSON(timersData[i]);

        // Check if the timer is running before resetting its state
        if (timer.isRunning) {
            const remainingTime = timer.remainingTime;
            timer.isRunning = false;
            timer.startTimer();
            timer.remainingTime = remainingTime; // Set the remaining time back to the loaded value
        }
    });

    console.log('Mobs - Timers loaded :)');
}

const mobs_names = [
    "ladybug", "rhino_beetle", "spider", "mantis", "scorpion", "werewolf",
    "stump_snail", "rogue_vicious_bee", "wild_windy_bee", "commando_chick",
    "king_beetle", "tunnel_bear", "mondo_chick", "coconut_crab"
];
const mobs_durations = [
    5, 5, 30, 20, 20, 60,
    5760, 10, 40, 30,
    1440, 2880, 60, 2160
];
const mobs_num_timers = [
    3, 4, 1, 2, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1
];
const mobs_timers = [];

for (let i = 0; i < mobs_names.length; i++) {
    for (let j = 1; j <= mobs_num_timers[i]; j++) {
        mobs_timers.push(new CountdownTimer(mobs_names[i], mobs_durations[i], "mob", `#${mobs_names[i]}_mob_timer`, j.toString()));
    }
}

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
        setInterval(function () { $(timer.spanId).text(timer.formatTime()); }, 100);

        // links each html buttons with their respective timer js methods
        // start_btn
        $(`${timer.spanId}_start`).on('click', function () { timer.startTimer(); });

        // -10min_btn
        $(`${timer.spanId}_aux_1`).on('click', function () { timer.subMinutes(10); });

        // -5min_btn
        $(`${timer.spanId}_aux_2`).on('click', function () { timer.subMinutes(5); });

        // reset_btn
        $(`${timer.spanId}_reset`).on('click', function () { timer.resetTimer(); });
    });

    // ============================================================ //
    // MOBS

    mobs_timers.forEach((timer) => {
        // set dispenser_timers to update spans each second;
        setInterval(function () { $(timer.spanId).text(timer.formatTime()); }, 100);

        // links each html buttons with their respective timer js methods
        // start_btn
        $(`${timer.spanId}_start`).on('click', function () { timer.startTimer(); });

        // -10min_btn
        $(`${timer.spanId.slice(0, -2)}_aux_1`).on('click', function () { timer.subMinutes(10); });

        // -5min_btn
        $(`${timer.spanId.slice(0, -2)}_aux_2`).on('click', function () { timer.subMinutes(5); });

        // reset_btn
        $(`${timer.spanId}_reset`).on('click', function () { timer.resetTimer(); });
    });

    // ============================================================ //
    // GENERAL

    // updates the display icons
    $(".section_display_btn").each(function (i) {
        $(this).on("click", function () {
            let iconRef = $(this).children("i");
            if (iconRef.hasClass("bi-eye-slash-fill")) {
                iconRef.removeClass("bi-eye-slash-fill");
                iconRef.addClass("bi-eye-fill");
            } else {
                iconRef.removeClass("bi-eye-fill");
                iconRef.addClass("bi-eye-slash-fill");
            }
        });
    });




    // ============================================================ //
    // SAVING // LOADING
    loadDispenserTimers();
    const dispenserAutoSave = setInterval(() => { saveDispenserTimers(); }, 1 * 1000);

    loadMobsTimers();
    const mobsAutoSave = setInterval(() => { saveMobsTimers(); }, 1 * 1000);
});