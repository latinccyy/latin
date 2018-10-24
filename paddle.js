class Paddle {
    constructor() {
        this.x = 100
        this.y = 250
        this.h = 30
        this.w = 200
        this.speed = 30
        this.image = imageFromPath('paddle.png')
    }

    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }

    
}
