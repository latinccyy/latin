class Bird extends Entity {
    constructor(game, name) {
        super(game, name)
        this.init()
    }

    init() {
        this.x = 100
        this.y = 0
        this.h = 40
        this.w = 40
        // 只要小鸟没有掉到最下面，都算是在飞
        this.flying = true
        this.dropSpeed = 5
        this.jumpSpeed = -10
        this.dead = false
    }

    update() {
        if (this.flying) {
            this.drop()
        }
    }

    drop() {
        // 调整角度使头向下
        this.rotation = 45
        this.flying = this.y < window.height - this.h
        if (this.flying) {
            this.y += this.dropSpeed
        }
    }

    jump() {
        if (this.dead) {
            return
        }
        // 调整角度使头向上
        this.rotation = -45
        var touchTop = this.y <= 0
        if (!touchTop) {
            this.y += this.jumpSpeed
        }
    }


}
