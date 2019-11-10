
class EnemyAttackSystem extends AttackSystem {
    constructor(attacker, isTrace, bulletCount, bulletSpeed, cool) {
        super(attacker, isTrace, bulletCount, bulletSpeed, cool)
        this.target = this.scene.player
    }
}

class BossAttackSystem extends EnemyAttackSystem {
    constructor(boss, isTrace, bulletCount, bulletSpeed, cool) {
        super(boss, isTrace, bulletCount, bulletSpeed, cool)
        // boss可以在冷却后的一段时间内一直攻击，而不是只能在特定timer攻击一次
        this.attackTimer = 5
    }

    // 冷却后，enemyBullet只能发射一次，bossBullet可以一直发射
    launch () {
        if (this.timer % this.cool == this.attackTimer) {
            this.launchBullet(30, 15, false, 'enemyBullet')
        }
        this.launchBullet(10, 3, true, 'bossBullet')
    }

    attackState() {
        return this.attacker.stopMove()
    }

    // 冷却后，如果达到this.attackTimer，才会进入冷却时间，否则可以继续攻击
    coolOver () {
        return this.timer % this.cool <= this.attackTimer
    }

    getBullet(bulletName, bulletData) {
        var b = new EnemyBullet(this.game, this.target, bulletName, bulletData)
        return b
    }
}

class GeneralAttackSystem extends EnemyAttackSystem {
    constructor(attacker, isTrace, bulletCount, bulletSpeed, cool) {
        super(attacker, isTrace, bulletCount, bulletSpeed, cool)
    }

    launch() {
        this.launchBullet(30, this.bulletCount, this.isTrace, 'enemyBullet')
    }

    attackState() {
        // 出现在画面中，且未离开画面，则进入攻击状态
        var leaveScene = this.attacker.y > window.height - this.attacker.h * 2
        var appear = this.attacker.y > 0
        return appear && !leaveScene
    }

    getBullet(bulletName, bulletData) {
        var b = new EnemyBullet(this.game, this.target, bulletName, bulletData)
        return b
    }
}
