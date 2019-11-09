



function __main() {
    // 切换游戏
    setSceneUpdater()
    window.width = 400
    window.height = 300
    __game = new Game()

    // 方便场景切换、移动图像等操作
    debugMode(__game, true)
}


__main()
