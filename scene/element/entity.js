class Entity {
    constructor(game, name) {
        this.game = game
        this.scene = game.scene
        this.image = game.imageByName(name)
        this.rotation = 0
        this.name = name
    }

    draw() {
        this.game.drawImage(this, this.rotation)
    }

    debug() {

    }

    disappear() {
        this.scene.removeElement(this)
    }


}

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

    debug() {

    }

}
