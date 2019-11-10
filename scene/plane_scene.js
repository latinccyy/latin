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

    update() {
        for (var e of this.elements) {
            e.update()
        }
        this.updateAlive()
        this.updateGameState()
    }

    getImages(kind) {
        var es = []
        for (var e of this.elements) {
            if (e.kind == kind) {
                es.push(e)
            }
        }
        return es
    }

    addEnemys() {
        var es = [
            new SubEnemy(this.game, 20, true),
            new SubEnemy(this.game, 350, true),
            new Boss(this.game, 250, true),
        ]
        for (var e of es) {
            this.addElement(e)
        }
    }

    updateGameState() {
        if (this.player.dead() || this.killAllEnemy()) {
            this.game.gameOver()
        }
    }

    killAllEnemy() {
        var es = this.getImages('enemy')
        return es.length == 0
    }

    updateAlive() {
        for (var e of this.elements) {
            // background没有dead方法
            if (e.dead && e.dead()) {
                this.removeElement(e)
            }
        }
    }

    createSpark(image) {
        var nSpark = 20
        for( var i = 0; i < nSpark; i++) {
            var x = image.x + image.w / 2
            var y = image.y + image.h / 2
            var s = new Spark(this.game, 'spark', x, y)
            this.addElement(s)
        }
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
