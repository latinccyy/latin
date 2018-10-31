class Background extends Entity {
    constructor(game, name) {
        super(game, name)
        this.x = 0
        this.y = 0
        this.h = window.height
        this.w = window.width
    }

    update() {

    }
}


class StaticBackground extends Background {
    constructor(game, name) {
        super(game, name)
    }
}

class DynamicBackground extends Background {
    constructor(game, name) {
        super(game, name)
        this.speed = 5
    }

    update() {
        this.y += this.speed
        if (this.y >= this.h) {
            this.y = -this.h
        }
    }
}
