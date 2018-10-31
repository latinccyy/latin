class TitleScene extends Scene {
    constructor(game) {
        super(game)
        this.setListener()
        this.background = new StaticBackground(game, 'title_bg')
        this.addElement(this.background)
    }

    draw() {
        for (var s of this.elements) {
            this.game.drawImage(s)
        }
        this.game.drawText(this.text, this.x, this.y)
    }
}
