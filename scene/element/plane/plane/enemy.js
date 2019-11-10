
class Enemy extends Plane {
    constructor(game, name, x) {
        super(game, name, x)
    }

    update() {
        this.updatePosition()
        this.attack()
        this.attackStrategy.update()
        if (this.outOfScene() || this.dead()) {
            this.disappear()
        }
    }

    move() {
        this.y += this.ySpeed
    }
}

class GeneralEnemy extends Enemy {
    constructor(game, x, isTrace) {
        super(game, 'enemy', x)
        this.init(isTrace)
    }

    init(isTrace) {
        this.w = 120
        this.h = 60
        this.y = -this.h
        this.lives = 10
        this.ySpeed = 1
        this.attackStrategy = new GeneralAttackSystem(this, isTrace, 3, 8, 100)
    }

    outOfScene() {
        return this.y > window.height
    }

    updatePosition() {
        this.move()
    }

}

class Boss extends Enemy{
    constructor(game, x, isTrace) {
        super(game, 'boss', x)
        this.init(isTrace)
    }

    init(isTrace) {
        this.w = 150
        this.h = 150
        this.y = -this.h
        this.ySpeed = 1
        this.lives = 100
        this.attackStrategy = new BossAttackSystem(this, true, null, 15, 80)
    }

    updatePosition() {
        if (!this.stopMove()) {
            this.move()
        }
    }

    stopMove() {
        return this.y > this.h / 3
    }

    outOfScene() {
        return false
    }
}
