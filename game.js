

class Game {
    constructor() {
        var canvas = document.querySelector('#id-canvas')
        var context = canvas.getContext('2d')
        log(canvas)
        this.canvas = canvas
        this.context = context
        this.actions = {}
        this.keydowns = {}
        this.scene = []
        var paddle = new Paddle()
        var ball = new Ball()
        this.paddle = paddle
        this.ball = ball
        this.scene.push(paddle)
        this.scene.push(ball)

        this.addListener()


    }

    run() {
        setInterval(() => {
            this.update()
            this.clear()
            this.draw()
        }, 1000/window.fps)
    }

    addListener() {
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })

        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })

        this.register('ArrowLeft', () => {
            this.paddle.moveLeft()
        })

        this.register('ArrowRight', () => {
            this.paddle.moveRight()
        })
    }

    register(key, callback) {
        this.actions[key] = callback
    }

    update() {
        this.ball.move()
        if (collide(this.paddle, this.ball)) {
            this.ball.rebound()
        }
        for (var k in this.actions) {
            if (this.keydowns[k]) {
                this.actions[k]()
            }
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    draw () {
        for (var s of this.scene) {
            this.drawImage(s)
        }
    }

    drawImage(image) {
        this.context.drawImage(image.image, image.x, image.y, image.w, image.h);
    }
}
