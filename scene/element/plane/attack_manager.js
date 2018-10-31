class Attack {
    constructor(attacker, isTrace, bulletCount, bulletSpeed, cool) {
        this.game = attacker.game
        this.scene = attacker.scene
        this.attacker = attacker
        this.isTrace = isTrace
        this.timer = cool
        this.bulletCount = bulletCount
        this.cool = cool
        this.bulletSpeed = bulletSpeed
    }

    update() {
        this.updateTimer()
    }

    attack () {
        if (this.attackState()) {
            if (this.coolOver()) {
                this.launch()
                this.clearCool()
            }
        }
    }

    clearCool() {
        this.timer = 0
    }

    // 发射的子弹形成一个圆或部分圆，涉及一些数学关系，应该多加一点注释，
    // 但之前写的时候没有加上，现在也懒得去看了，知道有这么回事就好。。
    launchBullet(angle, bulletCount, isTrace, bulletName) {
        var bulletDatas = this.bulletDatas(angle, bulletCount, isTrace)
        for (var bd of bulletDatas) {
            var b = this.getBullet(bulletName, bd)
            this.scene.addElement(b)
        }
    }

    coolOver () {
        return this.timer >= this.cool
    }

    updateTimer () {
        this.timer += 1
    }

    speed(source, target, speed) {
        var f = this.TrigonometricFunction(source, target)
        var xSpeed = speed * f.cos
        var ySpeed = speed * f.sin
        var o = {
            'x': xSpeed,
            'y': ySpeed,
        }
        return o
    }

    circleCenter() {
        // 攻击者发射的所有子弹的圆心
        var o = {
            x: this.attacker.x + this.attacker.w / 2,
            y: this.attacker.y + this.attacker.h / 2,
        }
        return o
    }

    middleRadian(isTrace) {
        if (isTrace) {
            var center = this.circleCenter()

            var target = {
                'x': this.target.x + this.attacker.w / 2,
                'y': this.target.y + this.attacker.h / 2,
            }
            return this.radian(center, target)
        } else {
            return Math.PI / 2
        }
    }

    radian(center, dot) {
        var deltaX = dot.x - center.x
        var deltaY = dot.y - center.y
        if (deltaY == 0) {
            var atan = 0
        } else {
            var tan = deltaY / deltaX
            var atan = Math.atan(tan)
        }
        if (deltaX < 0) {
            atan += Math.PI
        }
        return atan
    }

    bulletDatas(angle, bulletCount, isTrace) {
        var radius = 20
        var stepLength = angle * Math.PI / 180
        var middle = this.middleRadian(isTrace)
        var count = Math.floor(bulletCount / 2)
        var start = middle - count * stepLength
        // 计算有误差 所以加上步长的1/2，保证最后一个bullet能计入循环
        var end = middle + count * stepLength + stepLength / 2
        var center = this.circleCenter()
        var bulletDatas = []
        for (var radian = start; radian < end; radian += stepLength) {
            var b = this.bulletData(center, radian, radius)
            bulletDatas.push(b)
        }
        return bulletDatas
    }

    bulletData(center, radian, radius) {
        var x = center.x + radius * Math.cos(radian)
        var y = center.y + radius * Math.sin(radian)
        var bullet = {
            'x': x,
            'y': y,
        }
        var s = this.speed(center, bullet, this.bulletSpeed)
        bullet.xSpeed = s['x']
        bullet.ySpeed = s['y']
        return bullet
    }

    TrigonometricFunction(source, target) {
        var deltaX = target.x - source.x
        var deltaY = target.y - source.y
        var sum = Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        var distance = Math.sqrt(sum)
        var o = {
            sin: deltaY / distance,
            cos: deltaX / distance,
        }
        return o
    }
}

class EnemyAttack extends Attack {
    constructor(attacker, isTrace, bulletCount, bulletSpeed, cool) {
        super(attacker, isTrace, bulletCount, bulletSpeed, cool)
        this.target = this.scene.player
    }

}

class BossAttack extends EnemyAttack {
    constructor(boss, isTrace, bulletCount, bulletSpeed, cool) {
        super(boss, isTrace, bulletCount, bulletSpeed, cool)
    }

    getBullet(bulletName, bulletData) {
        var b = new EnemyBullet(this.game, bulletName, bulletData)
        return b
    }


    attackState() {
        return this.attacker.stopMove()
    }

    launch () {
        if (this.timer % this.cool == 5) {
            this.launchBullet(30, 15, false, 'enemyBullet')
        }
        this.launchBullet(10, 3, true, 'bossBullet')
    }

    clearCool() {
        if (this.timer % this.cool == 5) {
            this.timer = 6
        }

    }

    coolOver () {
        return this.timer % this.cool <= 5
    }
}

class SubAttack extends EnemyAttack {
    constructor(attacker, isTrace, bulletCount, bulletSpeed, cool) {
        super(attacker, isTrace, bulletCount, bulletSpeed, cool)
    }

    getBullet(bulletName, bulletData) {
        var b = new EnemyBullet(this.game, bulletName, bulletData)
        return b
    }

    launch() {
        this.launchBullet(30, this.bulletCount, this.isTrace, 'enemyBullet')
    }

    attackState() {
        var leave = this.attacker.y > window.height - this.attacker.h * 2
        var appear = this.attacker.y > 0
        return appear && !leave
    }

}

class PlayerAttack extends Attack {
    constructor(attacker, isTrace, bulletCount, bulletSpeed, cool) {
        super(attacker, isTrace, bulletCount, bulletSpeed, cool)
    }

    getBullet(bulletName, bulletData) {
        var b = new PlayerBullet(this.game, bulletName, bulletData)
        return b
    }

    launch() {
        this.launchBullet(30, this.bulletCount, this.isTrace, 'playerBullet')
    }

    attackState() {
        return true
    }

}
