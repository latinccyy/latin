class PlaneScene extends MainScene{
    constructor(game) {
        super(game, PLANE)
    }

    init() {
        this.bg1 = new DynamicBackground(this.game, 'dynamic_bg')
        this.bg2 = new DynamicBackground(this.game, 'dynamic_bg')
        this.bg1.y = 0
        this.bg2.y = -this.bg2.h
        this.player = new Player(this.game, this)
        this.addElement(this.bg1)
        this.addElement(this.bg2)
        this.addElement(this.player)
        this.addEnemys()
    }

    addEnemys() {
        var es = [
            new GeneralEnemy(this.game, 20, true),
            new GeneralEnemy(this.game, 350, true),
            new Boss(this.game, 250, true),
        ]
        for (var e of es) {
            this.addElement(e)
        }
    }

    update() {
        for (var e of this.elements) {
            e.update()
        }
        this.updateGameState()
    }

    updateGameState() {
        if (this.player.dead() || this.killAllEnemy()) {
            this.game.gameOver()
        }
    }

    killAllEnemy() {
        for (var e of this.elements) {
            if (e instanceof Enemy) {
                return false
            }
        }
        return true
    }

    createSpark(image) {
        var nSpark = 20
        for( var i = 0; i < nSpark; i++) {
            var x = image.x + image.w / 2
            var y = image.y + image.h / 2
            var s = new Spark(this.game, x, y)
            this.addElement(s)
        }
    }

    getAllEnemys() {
        var es = []
        for (var e of this.elements) {
            if (e instanceof Enemy) {
                es.push(e)
            }
        }
        return es
    }

    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }

    setListener() {
        var p = this.player

        this.game.registerAction("ArrowUp", function () {
            p.moveUp()
        })

        this.game.registerAction("ArrowDown", function () {
            p.moveDown()
        })

        this.game.registerAction("ArrowLeft", function () {
            p.moveLeft()
        })

        this.game.registerAction("ArrowRight", function () {
            p.moveRight()
        })

        this.game.registerAction("f", function () {
            p.attack()
        })

    }

    clear() {
        this.game.deregisterAction('ArrowUp')
        this.game.deregisterAction('ArrowDown')
        this.game.deregisterAction('ArrowLeft')
        this.game.deregisterAction('ArrowRight')
        this.game.deregisterAction('j')
    }

}
