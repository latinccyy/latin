

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

function insertConfigHtml() {
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

function bindControler() {
    bindEvents('.controler_input', 'input', function(event) {
        var input = event.target
        var v = input.value
        config[input.id].value = v
        var label = input.closest('label').querySelector('.value')
        label.innerText = v
    })
}

function setControler(enable) {
    if (enable) {
        insertConfigHtml()
        bindControler()
    }

}

function updateCanvas(sceneName) {
    var can = document.querySelector('#id-canvas')
    var w = 0
    var h = 0
    if (sceneName == 'brick') {
        w = 400
        h = 300
    } else if (sceneName == 'bird') {
        w = 400
        h = 300
    } else if (sceneName == 'plane') {
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
    bindEvents('#id-scene_update', 'click', function(event) {
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
    listenPause()
    listenLoadLevel(game)
    listenDragBall(game)
    listenEndScene(game)
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
