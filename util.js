var log = console.log.bind(console)

function imageFromPath(path) {
    var img = new Image();
    img.src = path;
    return img

}

function collide(rect1, rect2) {
    var collideX = rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x
    var collideY = rect1.y < rect2.y + rect2.h && rect1.h + rect1.y > rect2.y
    return collideX && collideY
}
