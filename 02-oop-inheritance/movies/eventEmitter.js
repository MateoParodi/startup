class EventEmitter {
    constructor() {
        this.events = {};
    }

    /**
     * Add a callback to an event.
     *
     * @param event
     * @param callback
     */
    on(event, callback) {
        if(Array.isArray(this.events[event])) {
            console.log("El evento ya existe, agregando una funcion mas al arreglo");
            this.events[event].push(callback);
        } else {
            console.log("El evento no existe, registrando");
            this.events[event] = [callback];
        }
    }

    /**
     *
     * Emit an event and execute all its callbacks.
     *
     * @param event
     */
    emit(event) {
        if(Array.isArray(this.events[event])) {
            for(var i = 0; i < this.events[event].length; i++) {
                this.events[event][i]();
            }
        }
    }

    /**
     * Delete all the callbacks from an event.
     *
     * @param event
     */
    off(event) {
        if(Array.isArray(this.events[event])) {
            delete this.events[event];
        }
    }
}