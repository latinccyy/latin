class BirdScene extends MainScene{
    constructor(game) {
        super(game, BIRD)
    }

    init() {
        this.background = new StaticBackground(this.game, 'static_bg')
        this.bird = new Bird(this.game)
        this.grounds = new Grounds(this.game)
        this.pipes = new Pipes(this.game)
        this.addElement(this.background)
        this.addElement(this.bird)
        this.addElement(this.grounds)
        this.addElement(this.pipes)
    }

    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }

    update() {
        if (this.bird.dead) {
            // 只有鸟在更新，其他元素不更新
            this.bird.update()
        } else {
            this.normalUpdate()
        }

        if (this.isGameOver()) {
            this.game.gameOver()
        }
    }

    // 游戏正常进行时（游戏未结束）的画面更新
    normalUpdate() {
        for (var e of this.elements) {
            e.update()
            if (this.collidePipe()) {
                this.bird.dead = true
            }
        }
    }

    collidePipe() {
        for (var p of this.pipes.elements) {
            if (collide(this.bird, p)) {
                return true
            }
        }
        return false
    }

    isGameOver() {
        // 小鸟死了之后还要有一个死亡动画，当掉到最下面才进入结束画面
        var fail = this.bird.dead && this.bird.touchBottom()
        return fail || this.pipes.passAllPipe()
    }

    setListener() {
        this.game.registerAction('j', () => {
            this.bird.jump()
        })
    }

    clear() {
        this.game.deregisterAction('j')
    }
}
