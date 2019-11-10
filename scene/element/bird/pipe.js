
class Pipes extends EntityGroup{
    constructor(game, name) {
        super(game, name)
        this.init(name)
    }

    init(name) {
        this.speed = configValue('pipe_speed')
        // 管道横向间距
        this.spaceX = configValue('pipe_space_x')
        // 管道纵向间距
        this.spaceY = configValue('pipe_space_y')
        this.elements = this.getElements(name)
        // 一列有上下两个管道
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

    // 更新管道状态
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
                    this.movePositionToEnd(above, below)
                    this.setPipeY(above, below)
                }
            }
        }
    }

    removePipe(pipe) {
        remove(this.elements, pipe)
        pipe.disappear()
    }

    // 把画面最左边的管道移动到最后面，这样就可以在所有管道都过去后，接上这个管道
    movePositionToEnd(above, below) {
        var firstCol = this.elements.indexOf(above) == 0
        var x = 0
        if (firstCol) {
            var endPipe = this.elements[this.elements.length - 1]
            x = endPipe.x + this.spaceX
        } else {
            var pre = this.previousPipe(above)
            x = pre.x + this.spaceX
        }
        above.x = x
        below.x = x
    }

    setPipeY(above, below) {
        above.y = 0
        above.h = randomInt(30, 70)
        below.h = GROUND_Y - above.h - this.spaceY
        below.y = GROUND_Y - below.h
    }

    // 同一行的前一个管道
    previousPipe(pipe) {
        var i = this.elements.indexOf(pipe)
        var pos = i - 2
        if (pos >= 0) {
            var p = this.elements[i - 2]
        } else {
            var p = null
        }
        return p
    }

    passAllPipe() {
        return this.elements.length <= 0
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
