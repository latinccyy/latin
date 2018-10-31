class Scene {
    constructor(game) {
        this.game = game
        game.scene = this
        this.elements = []
    }



    update() {}

    draw() {}

    setListener() {}

    addElement(image) {
        this.elements.push(image)
    }

    removeElement(image) {
        remove(this.elements, image)
    }

}
