
class Grounds extends EntityGroup{
    constructor(game, name) {
        super(game)
        this.init()
    }

    init() {
        this.w = 40
        this.speed = 5
        this.skipCount = this.w / this.speed
        this.elements = this.initElements()
    }

    initElements() {
        var sceneWidth = sceneConfig['bird'].w
        var nGround = sceneWidth / this.w + 2
        var gs = []
        for (var i = 0; i < nGround; i++) {
            var g = new Ground(this.game, i)
            gs.push(g)
        }
        return gs
    }

    update() {
        var outIndex = null
        for (var [index, ground] of this.elements.entries()) {
            ground.update()
            if (ground.outOfScene()) {
                outIndex = index
            }
        }
        if (outIndex != null) {
            this.moveToEnd(outIndex)
        }
    }

    // 返回画面中最右边（包括看不见的部分）的草地
    // 实际上是元素在数组中的前一个元素
    endOfGrounds(elementIndex) {
        var pre = elementIndex == 0 ? this.elements.length - 1 : elementIndex - 1
        return this.elements[pre]
    }

    moveToEnd(outIndex) {
        var out = this.elements[outIndex]
        var end = this.endOfGrounds(outIndex)
        out.x = end.x + end.w
    }
}


class Ground extends Entity {
    constructor(game, index) {
        super(game, 'ground')
        this.init(index)
    }

    init(index) {
        this.h = 20
        this.w = 40
        this.x = index * this.w
        this.y = GROUND_Y
        this.speed = 5
    }

    update() {
        this.x -= this.speed
    }

    outOfScene() {
        return this.x < -this.w
    }
}
