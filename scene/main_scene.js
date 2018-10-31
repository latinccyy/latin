class MainScene extends Scene{
    constructor(game) {
        super(game)
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
