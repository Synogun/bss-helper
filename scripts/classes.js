class CountdownTimer {
    constructor(name, duration, spanId) {
        this.name = name;
        this.duration = duration * 60 * 1000; // (min -> s) -> ms;
        this.isRunning = false;
        this.startTime = null;
        this.timerId = null;
        this.spanId = spanId;
        this.remainingTime = this.duration;
    }

    startTimer(noMsg) {
        if (!this.isRunning) {
            this.startTime = Date.now() - (this.duration - this.remainingTime);
            this.isRunning = true;
            this.toggleCardBtns(true);
            this.timerId = setInterval(() => {
                this.remainingTime = this.duration - (Date.now() - this.startTime);
                if (this.remainingTime <= 0) {
                    this.resetTimer(true);
                    this.toggleCardBtns();
                    console.log(`${this.name} timer has finished!`);
                }
            }, 1000);
            if (!noMsg) console.log(`${this.name} timer started.`);
        }
    }

    stopTimer(noMsg) {
        if (this.isRunning) {
            clearInterval(this.timerId);
            this.isRunning = false;
            this.remainingTime = this.duration - (Date.now() - this.startTime);
            if (!noMsg) console.log(`${this.name} timer stopped.`);
        }
    }

    resetTimer(noMsg) {
        this.stopTimer(true);
        this.startTime = null;
        this.remainingTime = this.duration;
        this.toggleCardBtns();
        if (!noMsg) console.log(`${this.name} timer reset.`);
    }

    formatTime() {
        const hours = Math.floor(this.remainingTime / 3600000);
        const minutes = Math.floor((this.remainingTime % 3600000) / 60000);
        const seconds = Math.floor((this.remainingTime % 60000) / 1000);

        return `${this.#padZero(hours)}:${this.#padZero(minutes)}:${this.#padZero(seconds)}`;
    }

    #padZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    subMinutes(minutes) {
        if (this.isRunning) {
            this.startTime -= minutes * 60000;
            this.remainingTime = this.duration - (Date.now() - this.startTime);

            if (this.remainingTime <= 0) {
                this.stopTimer(true);
                console.log(`${this.name} timer has finished!`);
            }

            console.log(`${minutes} minutes subtracted from ${this.name} timer.`);
        } else {
            console.log(`${this.name} timer is not running.`);
        }
    }

    toggleCardBtns(use) {
        const cardId = `#${this.name}_dispenser_card`;
        const cardFooter = $(cardId).children(".card-footer");
        const cardFooterBtns = cardFooter.children("button");
        const startBtn = cardFooter.children(":eq(2)");

        if (use === true) { // reset == null - timer is running
            cardFooter.addClass("btn-group");
            cardFooterBtns.removeClass("d-none");
            startBtn.addClass("d-none");
        } else { // reset != null - timer isn't running
            cardFooter.removeClass("btn-group");
            cardFooterBtns.addClass("d-none");
            startBtn.removeClass("d-none");
        }
    }

    toJSON() {
        if (this.isRunning) {
            return {
                name: this.name,
                duration: this.duration,
                spanId: this.spanId,
                isRunning: this.isRunning,
                startTime: this.startTime,
                lastSaveTime: Date.now(),
            };
        } else {
            return {
                name: this.name,
                duration: this.duration,
                spanId: this.spanId,
                isRunning: this.isRunning,
            };
        }
    }

    fromJSON(timerData) {
        this.name = timerData.name;
        this.duration = timerData.duration;
        this.spanId = timerData.spanId;

        if (timerData.isRunning) {
            this.startTime = timerData.startTime;
            this.isRunning = timerData.isRunning;
            this.remainingTime = this.duration - (Date.now() - this.startTime);

            if (this.remainingTime <= 0) {
                this.resetTimer(true);
            } else {
                const offlineTime = Date.now() - timerData.lastSaveTime;
                this.startTime -= offlineTime;
            }
        }
    }
}
