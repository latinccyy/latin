
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
    'ball':         'image/ball.png',
    'brick':        'image/brick.png',
    'paddle':       'image/paddle.png',
    'bird':         'image/bird.jpg',
    'ground':       'image/ground.png',
    'pipe':         'image/pipe.png',
    'player':         'image/player.png',
    'enemy':         'image/enemy.png',
    'boss':         'image/enemy.png',
    'playerBullet':         'image/playerBullet.png',
    'enemyBullet':         'image/enemyBullet.png',
    'bossBullet':         'image/bossBullet.png',
    'spark':         'image/spark.png',
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
