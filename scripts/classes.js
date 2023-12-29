class CountdownTimer {
    constructor(name, duration, spanId) {
        this.name = name;
        this.duration = (duration * 60) * 1000; // (min -> s) -> ms;
        this.isRunning = false;
        this.startTime = null;
        this.elapsedTime = 0;
        this.timerId = null;
        this.spanId = spanId;
        this.finished = false;
    }

    startTimer() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.elapsedTime = Date.now() - this.startTime;
                if (this.elapsedTime >= this.duration) {
                    this.pauseTimer(true);
                    this.finished = true;
                    console.log(`${this.name} timer has finished!`);
                }
            }, 1000);
            console.log(`${this.name} timer started.`);
        }
    }

    pauseTimer(noMsg) {
        if (this.isRunning) {
            clearInterval(this.timerId);
            this.isRunning = false;
            if (!noMsg) console.log(`${this.name} timer paused.`);
        }
    }

    resetTimer(noMsg) {
        this.pauseTimer(true);
        this.elapsedTime = 0;
        this.startTime = null;
        this.finished = false;
        if (!noMsg) console.log(`${this.name} timer reset.`);
    }

    formatTime() {
        let remainingTime = this.duration;
        if (this.isRunning) remainingTime -= this.elapsedTime;

        const hours = Math.floor(remainingTime / 3600000); // 1 hour = 3600000 milliseconds
        const minutes = Math.floor((remainingTime % 3600000) / 60000); // 1 minute = 60000 milliseconds
        const seconds = Math.floor((remainingTime % 60000) / 1000); // 1 second = 1000 milliseconds

        return `${this.#padZero(hours)}:${this.#padZero(minutes)}:${this.#padZero(seconds)}`;
    }

    #padZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    subMinutes(minutes) {
        if (this.isRunning) {
            const subtractMilliseconds = minutes * 60000; // 1 minute = 60000 milliseconds
            this.startTime -= subtractMilliseconds;

            // Adjust elapsed time to ensure it remains within the valid range
            this.elapsedTime = Date.now() - this.startTime;
            if (this.elapsedTime >= this.duration) {
                this.pauseTimer(true);
                this.finished = true;
                console.log(`${this.name} timer has finished!`);
            }

            console.log(`${minutes} minutes subtracted from ${this.name} timer.`);
        } else {
            console.log(`${this.name} timer is not running.`);
        }
    }

    toJSON() {
        // Convert the CountdownTimer instance to a plain object for serialization
        
        return {
            name: this.name,
            duration: this.duration,
            isRunning: this.isRunning,
            startTime: this.startTime,
            elapsedTime: this.elapsedTime,
            spanId: this.spanId,
            finished: false
        };
    }

    fromJSON(timerData) {
        this.name = timerData.name;
        this.duration = timerData.duration;
        this.isRunning = timerData.isRunning;
        this.startTime = timerData.startTime;
        this.elapsedTime = timerData.elapsedTime;
        this.span_id = timerData.span_id;
        this.finished = timerData.finished;
    }
};