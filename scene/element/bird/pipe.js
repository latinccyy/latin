
class Pipes extends EntityGroup{
    constructor(game) {
        super(game)
        this.init()
    }

    init() {
        // 管道横向间距
        this.spaceX = configValue('pipe_space_x')
        // 管道纵向间距
        this.spaceY = configValue('pipe_space_y')
        // 管道到达画面最左边会回到管道列表最末尾，计数器减1
        this.repetition = 5

        this.elements = this.initElements()
    }

    update() {
        // 画面最左边的管道
        var pipeIndex = null
        for (var i = 0; i < this.elements.length; i += 2) {
            var above = this.elements[i]
            var below = this.elements[i + 1]
            above.update()
            below.update()
            if (above.outOfScene()) {
                pipeIndex = i
            }
        }

        if (pipeIndex == null) {
            return
        }

        // 管道到达画面最左边，如果没有达到一定次数，会移动到管道列表的末尾
        // 如果达到一定次数，会从列表中移除，当列表为空，则意味着通过了所有管道
        if (this.repetition < 0) {
            this.removePipe(pipeIndex)
        } else {
            this.repetition--
            this.movePositionToEnd(pipeIndex)
        }
    }

    initElements() {
        // 一列有上下两个管道
        var sceneWidth = sceneConfig['bird'].w
        var space = config['pipe_space_x'].value
        var columnOfPipe = sceneWidth /space + 2

        var ps = []
        for (var i = 0; i < columnOfPipe; i++) {
            var above = new Pipe(this.game, false)
            var below = new Pipe(this.game, true)
            this.initPosition(above, below, i)
            ps.push(above)
            ps.push(below)
        }
        return ps
    }

    initPosition(above, below, columnIndex) {
        above.x = 500 + columnIndex * this.spaceX
        below.x = above.x
        this.setPipeY(above, below)
    }

    // 把画面最左边的管道移动到最后面，这样就可以在所有管道都过去后，接上这个管道
    movePositionToEnd(pipeIndex) {
        var above = this.elements[pipeIndex]
        var below = this.elements[pipeIndex + 1]

        var end = this.endOfPipes(pipeIndex)
        var x = end.x + this.spaceX

        above.x = x
        below.x = x
        this.setPipeY(above, below)
    }

    // 随机生成纵向管道的高度
    setPipeY(above, below) {
        above.y = 0
        above.h = randomInt(30, 100)
        below.h = GROUND_Y - above.h - this.spaceY
        below.y = GROUND_Y - below.h
    }

    // 返回画面左边的最后一个上面的管道，而不是this.elements的最后一个元素
    // 实际上就是index对应管道在elements中的前一个元素
    // 首个元素的前一个元素对应最后一个元素
    endOfPipes(pipeIndex) {
        // 减2是为了跳过下面的管道对应的索引，取的是上面的管道的索引
        var pre = pipeIndex == 0 ? this.elements.length - 2 : pipeIndex - 2
        return this.elements[pre]
    }

    removePipe(pipeIndex) {
        var above = this.elements[pipeIndex]
        var below = this.elements[pipeIndex + 1]
        remove(this.elements, above)
        remove(this.elements, below)
        above.disappear()
        below.disappear()
    }

    passAllPipe() {
        return this.elements.length <= 0
    }
}

class Pipe extends Entity {
    constructor(game, flipY) {
        super(game, 'pipe')
        this.init(flipY)
    }

    init(reverse) {
        this.x = 0
        this.y = 0
        this.h = 0
        this.w = 40
        // 下面的管道图片要倒过来
        this.rotation = reverse ? 180 : 0
        this.speed = configValue('pipe_speed')
    }

    update() {
        this.x -= this.speed
    }

    outOfScene() {
        return this.x < -this.w
    }
}
