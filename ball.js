class Ball {
    constructor() {
        this.x = 200
        this.y = 150
        this.h = 30
        this.w = 30
        this.speedX = 10
        this.speedY = -10
        this.image = imageFromPath('ball.png')
    }

    move() {
        if (this.x < 0 || this.x > 400) {
            this.speedX *= -1
        }
        if (this.y < 0 || this.y > 300) {
            this.speedY *= -1
        }
        this.x += this.speedX
        this.y += this.speedY
    }

    rebound() {
        this.speedY *= -1
    }


}
