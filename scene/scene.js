class Scene {
    constructor(game, sceneName) {
        this.game = game
        game.scene = this
        this.elements = []
        this.sceneName = sceneName
    }

    update() {}

    draw() {}

    clear() {
        throw('必须继承 clear')
    }

    setListener() {}

    addElement(image) {
        this.elements.push(image)
    }

    removeElement(image) {
        remove(this.elements, image)
    }


}
