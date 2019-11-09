
class StartScene extends TitleScene{
    constructor(game) {
        super(game, START)
        this.text = '按 s 开始游戏'
        this.x = 150
        this.y = 150
    }

    setListener() {
        this.game.registerAction('s', () => {
            this.game.startMainScene()
        })
    }

    clear() {
        this.game.deregisterAction('s')
    }

}
