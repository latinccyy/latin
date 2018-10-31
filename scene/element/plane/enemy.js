


class Enemy extends Plane {
    constructor(game, imgName, x) {
        super(game, imgName, x)
        this.timer = 0
        this.kind = 'enemy'
    }

    update() {
        this.updateTimer()
        if (this.timer > this.updateTime) {
            this.updatePosition()
            this.attack()
            this.checkOutOfRange()
            this.attackStrategy.update()
        }
    }

    updateTimer() {
        this.timer++
    }

    checkOutOfRange() {
        if (this.outOfRange()) {
            this.disappear()
        }
    }

    move() {
        this.y += this.ySpeed
    }
}

class SubEnemy extends Enemy {
    constructor(game, imgName, x, isTrace) {
        super(game, imgName, x)
        this.init(isTrace)
    }

    init(isTrace) {
        this.updateTime = 20
        this.w = 120
        this.h = 60
        this.y = -this.h
        this.lives = 10
        this.ySpeed = 1
        this.attackStrategy = new SubAttack(this, isTrace, 3, 8, 100)
    }

    outOfRange() {
        return this.y > window.height
    }

    updatePosition() {
        this.move()
    }

}

class Boss extends Enemy{
    constructor(game, imgName, x, isTrace) {
        super(game, imgName, x)
        this.init(isTrace)
    }

    init(isTrace) {
        this.w = 150
        this.h = 150
        this.y = -this.h
        this.ySpeed = 1
        this.lives = 30
        this.updateTime = 20
        this.attackStrategy = new BossAttack(this, true, 15, 15, 80)

    }

    updatePosition() {
        if (!(this.stopMove())) {
            this.move()
        }
    }

    stopMove() {
        return this.y > this.h / 3
    }

    outOfRange() {
        return false
    }

}
