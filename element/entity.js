class Entity {
    constructor(game, name) {
        this.game = game
        this.scene = game.scene
        this.image = game.imageByName(name)
        this.rotation = 0
    }

    draw() {
        this.game.drawImage(this, this.rotation)
    }

    disappear() {
        this.scene.removeElement(this)
    }
}

// 包含多个元素的实体，比如多个管道
class EntityGroup {
    constructor(game) {
        this.game = game
        this.elements = []
    }

    getElements() {
        throw('必须继承getElements')
    }

    update() {
        throw('必须继承update')

    }

    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }
}
