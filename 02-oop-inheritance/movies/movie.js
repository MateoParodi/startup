class Movie extends EventEmitter {

    constructor(title, year, duration) {
        super();
        this.title = title;
        this.year = year;
        this.duartion = duration;
        this.cast = [];
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
    
    addCast(someCast) {
        if(Array.isArray(someCast)){
            for(var i = 0; i < someCast.length; i++) {
                this.cast.push(someCast[i])
            }
        }
        else{
            this.cast.push(someCast);
        }
    }
    
}

