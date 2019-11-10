
class Spark extends Entity{
    constructor(game, x, y) {
        super(game, 'spark')
        this.x = x
        this.y = y
        this.w = 10
        this.h = 10
        // 随机设置火花的移动方向
        this.xDirection = randomInt(0, 1) == 0 ? -1 : 1
        this.yDirection = randomInt(0, 1) == 0 ? -1 : 1
        this.xSpeed = this.xDirection * random(0, 2)
        this.ySpeed = this.yDirection * random(0, 2)

        this.alive = 15
    }

    dead() {
        return this.alive < 1
    }

    update() {
        this.alive--
        this.x += this.xSpeed
        this.y += this.ySpeed
        if (this.dead()) {
            this.disappear()
        }
    }
}
