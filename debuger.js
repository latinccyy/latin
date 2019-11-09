

function template(key, item) {
    var t = `
        <div>
            <label>
                <input class='controler_input' type="range"
                     id='${key}' value='${item.value}'
                     max='${item.max}'>
                ${item.comment}:
                <span class='value'>${item.value}</span>
            </label>
        </div>
    `
    return t
}

function insertControlerHtml() {
    var div = document.querySelector('.controler')
    var keys = Object.keys(config)
    for (var k of keys) {
        var item = config[k]
        var html = template(k, item)
        div.insertAdjacentHTML('beforeend', html)
    }
}

function bindEvents(selector, eventName, callback) {
    var es = document.querySelectorAll(selector)
    for (let e of es) {
        e.addEventListener(eventName, function(event) {
            callback(event)
        })
    }
}

function bindControlerListener() {
    bindEvents('.controler_input', 'input', function(event) {
        var input = event.target
        var v = input.value
        var controler = config[input.id]
        controler.value = v
        var label = input.closest('label').querySelector('.value')
        label.innerText = v
    })
}

// 帧率等控制模块，用于调试
function setControler() {
    insertControlerHtml()
    bindControlerListener()
}

// 根据不同的游戏设置canvas大小
function updateCanvas(sceneName) {
    var can = document.querySelector('#id-canvas')
    var w = 0
    var h = 0
    if (sceneName == BRICK) {
        w = 400
        h = 300
    } else if (sceneName == BIRD) {
        w = 400
        h = 300
    } else if (sceneName == PLANE) {
        w = 500
        h = 480
    }
    can.width = w
    can.height = h
    var ctx = can.getContext('2d')
    ctx.font = '20px serif';
    ctx.fillStyle = "white"
    window.width = w
    window.height = h
}

function setSceneUpdater() {
    bindEvents('#id-scene_update', 'change', function(event) {
        var v = event.target.value
        updateCanvas(v)
        __game.changeScene(v)
        __game.mainSceneName = v
    })
}

function debugMode(game, enable) {
    if (!enable) {
        return
    }
    // 设置监听器
    listenPause()
    listenLoadLevel(game)
    listenDragBall(game)
    listenEndScene(game)

    // 初始化控制器，用于在运行时更新config中的变量，改变游戏状态
    setControler()

}

function listenEndScene(game) {
    window.addEventListener('keydown', function(event) {
        if (event.key == 'o') {
            game.gameOver()
        }
    })
}

function listenLoadLevel(game) {
    window.addEventListener('keydown', function(event) {
        if ('0123456'.includes(event.key)) {
            var level = event.key
            var s = game.scene
            for (var b of s.elements) {
                if (b.kind == 'brick') {
                    s.removeElement(b)
                }
            }
            var bs = loadLevel(game, level)
            s.bricks = bs
            for (var b of bs) {
                s.addElement(b)
            }
        }
    })
}

function listenPause() {
    pause = false
    window.addEventListener('keydown', function(event) {
        if (event.key == 'p') {
            pause = !pause
        }
    })
}

function listenDragBall(game) {
    var canMove = false
    window.addEventListener('mousedown', function(event) {
        var b = game.scene.ball
        if (b && b.hasPoint(event.offsetX, event.offsetY)) {
            canMove = true
        }
    })

    window.addEventListener('mousemove', function(event) {
        if (canMove) {
            b = game.scene.ball
            b.x = event.offsetX
            b.y = event.offsetY
        }
    })

    window.addEventListener('mouseup', function(event) {
        canMove = false
    })
}
