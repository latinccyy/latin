class Grounds extends EntityGroup{
    constructor(game, name) {
        super(game)
        this.init(name)
    }

    init(name) {
        this.w = 40
        this.speed = 4
        this.skipCount = this.w / this.speed
        this.elements = this.getElements(name)
    }

    getElements(name) {
        var gs = []
        var nGround = 11
        for (var i = 0; i < nGround; i++) {
            // var x = i * this.w
            var g = new Ground(this.game, name, i)
            gs.push(g)
        }
        return gs
    }


    update() {
        var o = this.offset()
        for (var g of this.elements) {
            g.move(o)

        }
    }

    offset() {
        var o = -this.speed
        this.skipCount -= 1
        if (this.skipCount == 0) {
            this.skipCount = this.w / this.speed
            o = this.speed * (this.skipCount - 1)
        }
        return o
    }

}


class Ground extends Entity {
    constructor(game, name, index) {
        super(game, name)
        this.init(index)
    }

    init(index) {
        this.h = 20
        this.w = 40
        this.x = index * this.w
        this.y = 280
    }

    move(offset) {
        this.x += offset
    }
}
