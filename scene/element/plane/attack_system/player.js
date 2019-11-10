
class PlayerAttackSystem extends AttackSystem {
    constructor(attacker, isTrace, bulletCount, bulletSpeed, cool) {
        super(attacker, isTrace, bulletCount, bulletSpeed, cool)
    }

    launch() {
        this.launchBullet(30, this.bulletCount, this.isTrace, 'playerBullet')
    }

    attackState() {
        return true
    }

    getBullet(bulletName, bulletData) {
        var b = new PlayerBullet(this.game, bulletName, bulletData)
        return b
    }
}
