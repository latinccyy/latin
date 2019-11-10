
class Player extends Plane {
    constructor(game, imgName) {
        super(game, 'player', 225, 430)
        this.w = 50
        this.h = 50
        this.speed = 25

        this.lives = 1000
        this.timer = 60
        this.attackStrategy = new PlayerAttackSystem(this, false, 3, -40, 8)
    }

    update() {
        this.attackStrategy.update()
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
    moveUp() {
        if (this.y > 0) {
            this.y -= this.speed
        }
    }
    moveDown() {
        if (this.y < window.height - this.h) {
            this.y += this.speed
        }
    }
}
