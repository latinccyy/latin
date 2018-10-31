class BirdScene extends MainScene{
    constructor(game) {
        super(game)
    }

    init() {
        this.gameOver = false
        this.background = new StaticBackground(this.game, 'static_bg')
        this.bird = new Bird(this.game, 'bird')
        this.grounds = new Grounds(this.game, 'ground')
        this.pipes = new Pipes(this.game, 'pipe')
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
            this.DeadUpdate()
        } else {
            for (var e of this.elements) {
                e.debug()
                e.update()
                this.checkCollide()
            }
        }
        this.updateGameState()
    }

    checkCollide() {
        for (var p of this.pipes.elements) {
            if (collide(this.bird, p)) {
                this.bird.handleCollide()
                // this.gameOver = true
                return
            }
        }
    }

    updateGameState() {
        var stop = this.bird.dead && !this.bird.flying
        if (stop || !this.pipes.havePipe()) {
            this.gameOver = true
        }
        if (this.gameOver) {
            this.game.gameOver()
        }
    }

    DeadUpdate() {
        if (this.bird.flying) {
            this.bird.update()
        }
    }

    setListener() {
        this.game.registerAction('j', () => {
            this.bird.jump()
        })
    }

}
