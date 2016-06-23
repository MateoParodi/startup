class Movie extends EventEmitter {

    constructor(title, year, duration) {
        super();
        this.title = title;
        this.year = year;
        this.duartion = duration;
    }

    play() {
       super.emit("play");
    }

    pause() {
        super.emit("pause");
    }

    resume() {
        super.emit("resume");
    }

}