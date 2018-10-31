class Plane extends Entity {
    constructor(game, imgName, x, y) {
        super(game, imgName)
        this.x = x
        this.y = y
    }

    handleShot() {
        this.lives--
    }

    dead() {
        return this.lives < 1
    }

    attack() {
        this.attackStrategy.attack()
    }

    update() {
        throw('必须继承update')
    }


}


class Player extends Plane {
    constructor(game, imgName) {
        super(game, 'player', 225, 430)
        this.w = 50
        this.h = 50
        this.speed = 25

        this.lives = 1000
        this.timer = 0
        this.kind = 'player'
        this.attackStrategy = new PlayerAttack(this, false, 3, -40, 8)
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
