class EndScene extends TitleScene{
    constructor(game) {
        super(game, END)
        this.text = '按 r 重新开始游戏'
        this.x = 150
        this.y = 150
    }

    setListener() {
        this.game.registerAction('r', () => {
            this.game.startMainScene()
        })
    }

    clear() {
        this.game.deregisterAction('r')
    }

}
