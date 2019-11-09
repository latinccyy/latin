class MainScene extends Scene{
    constructor(game, sceneName) {
        super(game, sceneName)
        this.init()
        this.setListener()
    }

    init() {
        throw('必须继承init')
    }

    initElements() {
        throw('必须继承initElements')
    }
}
