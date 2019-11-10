
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
