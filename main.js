



function __main() {
    // 初始化控制器控制器，用于在运行时更新config中的变量
    setControler(true)
    // 切换游戏
    setSceneUpdater()
    window.width = 400
    window.height = 300
    __game = new Game(function() {
        var s = new StartScene(__game)
        __game.run()
    })

    // 方便场景切换、移动图像等操作
    debugMode(__game, true)

}


__main()
