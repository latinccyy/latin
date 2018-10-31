
class Pipes extends EntityGroup{
    constructor(game, name) {
        super(game, name)
        this.init(name)

    }

    init(name) {
        this.speed = configValue('pipe_speed')
        this.spaceX = configValue('pipe_space_x')
        this.spaceY = configValue('pipe_space_y')
        this.elements = this.getElements(name)
        var column = this.elements.length / 2
        this.repetition = 1 * column
    }

    getElements(name) {
        var columnOfPipe = 3
        var ps = []
        for (var i = 0; i < columnOfPipe; i++) {
            var above = new Pipe(this.game, name, false)
            var below = new Pipe(this.game, name, true)
            this.initPosition(above, below, i)
            ps.push(above)
            ps.push(below)
        }
        return ps
    }

    initPosition(above, below, column) {
        above.x = 500 + column * this.spaceX
        below.x = above.x
        this.setPipeY(above, below)
    }

    debug() {
        for (var e of this.elements) {
            e.speed = configValue('pipe_speed')
        }
        this.spaceX = configValue('pipe_space_x')
        this.spaceY = configValue('pipe_space_y')
    }

    update() {
        for (var i = 0; i < this.elements.length; i += 2) {
            var above = this.elements[i]
            var below = this.elements[i + 1]
            above.move()
            below.move()
            if (above.x < -100) {
                if (this.repetition < 0) {
                    this.removePipe(above)
                    this.removePipe(below)
                } else {
                    this.repetition--
                    this.setPipeX(above, below)
                    this.setPipeY(above, below)
                }
            }
        }
    }

    removePipe(pipe) {
        remove(this.elements, pipe)
        pipe.disappear()
    }

    setPipeX(above, below) {
        var firstCol = this.elements.indexOf(above) == 0
        var x = 0
        if (firstCol) {
            x = window.width
        } else {
            var front = this.frontPipe(above)
            x = front.x + this.spaceX
        }
        above.x = x
        below.x = x
    }

    setPipeY(above, below) {
        above.y = 0
        above.h = randomInt(30, 70)
            below.h = 280 - above.h - this.spaceY
        below.y = 280 - below.h
    }

    // 同一行的前一个管道
    frontPipe(pipe) {
        var i = this.elements.indexOf(pipe)
        var pos = i - 2
        if (pos >= 0) {
            var p = this.elements[i - 2]
        } else {
            var p = null
        }
        return p
    }

    havePipe() {
        return this.elements.length > 0
    }

}
class Pipe extends Entity {
    constructor(game, name, flipY) {
        super(game, name)
        this.init(flipY)
    }

    init(flipY) {
        this.x = 0
        this.y = 0
        this.h = 0
        this.w = 40
        this.rotation = flipY ? 180 : 0
        this.speed = configValue('pipe_speed')
    }

    move() {
        this.x -= this.speed
    }

}
