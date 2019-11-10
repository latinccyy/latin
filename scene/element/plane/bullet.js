class Bullet extends Entity {
    constructor(game, imgName, bulletData) {
        super(game, imgName)
        this.init(bulletData)
    }

    init(bulletData) {
        this.w = 15
        this.h = 15
        this.xSpeed = bulletData.xSpeed
        this.ySpeed = bulletData.ySpeed
        this.x = bulletData.x - this.w / 2
        this.y = bulletData.y - this.h / 2
        this.lives = 1
        this.kind = 'bullet'
    }

    update() {
        this.updatePosition()
        this.checkShot()
        this.checkoutOfScene()
    }

    checkoutOfScene() {
        if (this.outOfScene()) {
            this.disappear()
        }
    }

    checkShot() {
        var targets = this.scene.getImages(this.target)
        for (var t of targets) {
            if (collide(this, t)) {
                this.scene.createSpark(t)
                t.handleShot()
                this.handleShot()
            }
        }
    }

    handleShot() {
        this.lives -= 1
    }

    dead() {
        return this.lives < 1
    }

    updatePosition() {
        this.move()
    }

    move() {
        this.x += this.xSpeed
        this.y += this.ySpeed
    }


}

class PlayerBullet extends Bullet {
    constructor(game, bulletName, bulletData) {
        super(game, bulletName, bulletData)
        this.w = 20
        this.h = 20
        this.target = 'enemy'
    }

    outOfScene() {
        return this.y < 0
    }
}

class EnemyBullet extends Bullet {
    constructor(game, bulletName, bulletData) {
        super(game, bulletName, bulletData)
        this.target = 'player'
    }

    outOfScene() {
        return this.y >= window.height
    }

}
