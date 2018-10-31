class Brick extends Entity{
    constructor(game, name, state) {
        super(game, name)
        this.x = state[0]
        this.y = state[1]
        this.h = 20
        this.w = 50
        this.health = state[2]
        this.score = state[3]
        this.kind = 'brick'

        this.image = game.imageByName('brick')
    }

    decreaseHealth() {
        this.health -= 1
    }

    isDead() {
        return this.health < 1
    }

    handleCollide() {
        this.decreaseHealth()
    }

}
