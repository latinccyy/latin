class Paddle extends Entity {
    constructor(game, name) {
        super(game, name)
        this.init()
    }

    init() {
        this.x = 100
        this.y = 250
        this.h = 30
        this.w = 200
        this.speed = 30

    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed
        }
    }
    moveRight() {
        if (this.x < window.width - this.w) {
            this.x += this.speed
        }
    }

    handleCollide() {}


}
