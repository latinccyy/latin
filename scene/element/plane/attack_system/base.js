

class AttackSystem {
    constructor(attacker, isTrace, bulletCount, bulletSpeed, cool) {
        this.game = attacker.game
        this.scene = attacker.scene
        this.attacker = attacker
        this.isTrace = isTrace
        this.timer = cool
        this.cool = cool
        this.bulletSpeed = bulletSpeed
        this.bulletCount = bulletCount
    }

    update() {
        this.timer += 1
    }

    attack () {
        // 不同飞机有不同的攻击条件，比如进入画面后，经过冷却，才能进行攻击
        if (this.attackState()) {
            if (this.coolOver()) {
                this.launch()
            }
        }
    }

    launchBullet(angle, bulletCount, isTrace, bulletName) {
        var bulletDatas = this.bulletDatas(angle, bulletCount, isTrace)
        for (var bd of bulletDatas) {
            var b = this.getBullet(bulletName, bd)
            this.scene.addElement(b)
        }
    }

    // 冷却结束
    coolOver () {
        return this.timer % this.cool == 0
    }

    bulletDatas(angle, bulletCount, isTrace) {
        // 获取攻击者与目标相对于水平线的弧度
        // 一次攻击会发射多颗子弹，所有子弹呈弧形或圆形，最中间的子弹会追踪目标位置
        // middel就是最中间子弹相关的角度信息
        // 其他两边的子弹根据中间子弹的位置设置相关子弹信息

        // stepLength是子弹在圆上相隔的角度
        var stepLength = angle * Math.PI / 180
        var middle = this.middleRadian(isTrace)
        var count = Math.floor(bulletCount / 2)
        var start = middle - count * stepLength
        // 计算有误差 所以加上步长的1/2，保证最后一个bullet能计入循环
        var end = middle + count * stepLength + stepLength / 2
        // 攻击者的位置是所以子弹的圆心
        var center = this.attackerPosition()
        var bulletDatas = []
        for (var radian = start; radian < end; radian += stepLength) {
            var radius = 20
            var b = this.bulletData(center, radian, radius)
            bulletDatas.push(b)
        }
        return bulletDatas
    }

    // 攻击者与目标相对于水平线的弧度
    middleRadian(isTrace) {
        if (!isTrace) {
            return Math.PI / 2
        }
        var center = this.attackerPosition()
        // 目标位置
        var target = {
            'x': this.target.x + this.target.w / 2,
            'y': this.target.y + this.target.h / 2,
        }
        return this.radian(center, target)
    }

    attackerPosition() {
        var o = {
            x: this.attacker.x + this.attacker.w / 2,
            y: this.attacker.y + this.attacker.h / 2,
        }
        return o
    }

    // 圆心与圆上的点相对于水平线的弧度
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

    // 攻击者与目标相对于水平线的角度相关的三角函数信息，用于计算子弹的水平与垂直速度
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
