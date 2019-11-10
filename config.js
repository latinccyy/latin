
var PLANE = "plane"
var BIRD = "bird"
var BRICK = "brick"
var START = "start"
var END = "end"

var GROUND_Y = 280


var sceneConfig = {
    brick: {
        w: 400,
        h: 300,
        sceneConstructor: BrickScene,
    },
    bird: {
        w: 400,
        h: 300,
        sceneConstructor: BirdScene,
    },
    plane: {
        w: 500,
        h: 480,
        sceneConstructor: PlaneScene,
    },
    start: {
        w: 400,
        h: 300,
        sceneConstructor: StartScene,
    },
    end: {
        w: 400,
        h: 300,
        sceneConstructor: EndScene,
    },


}

var imageConfig = {
    'ball':         'image/brick/ball.png',
    'brick':        'image/brick/brick.png',
    'paddle':       'image/brick/paddle.png',
    'bird':         'image/bird/bird.jpg',
    'ground':       'image/bird/ground.png',
    'pipe':         'image/bird/pipe.png',
    'player':         'image/plane/player.png',
    'enemy':         'image/plane/enemy.png',
    'boss':         'image/plane/boss.gif',
    'playerBullet':         'image/plane/playerBullet.png',
    'enemyBullet':         'image/plane/enemyBullet.png',
    'bossBullet':         'image/plane/bossBullet.png',
    'spark':         'image/plane/spark.png',
    'dynamic_bg':   'image/dynamic_bg.jpg',
    'title_bg':         'image/title_bg.png',
    'static_bg':         'image/static_bg.jpg',

}

var config = {
    fps: {
        value: 50,
        max: 300,
        comment: '帧率',
    },
    pipe_space_x: {
        value: 150,
        max: 400,
        comment: '管道横向间距',
    },
    pipe_space_y: {
        value: 150,
        max: 400,
        comment: '管道纵向间距',
    },
    pipe_speed: {
        value: 5,
        max: 50,
        comment: '管道速度',
    },
}

var levels = [
    [
        [200, 100, 10000, 10],
    ],
    [
        [100, 100, 1, 10],
        [200, 100, 1, 10],
    ],
    [
        [100, 100, 2, 20],
        [200, 100, 2, 20],
        [300, 100, 2, 20],
    ]
]
