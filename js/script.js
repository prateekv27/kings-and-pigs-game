const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }

        this.width = 100
        this.height = 100

        this.velocity  = {
            x: 0,
            y: 0
        }

        this.sides = {
            bottom: this.position.y + this.height
        }
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        this.position.x +=this.velocity.x
        this.position.y += this.velocity.y

        this.sides.bottom = this.position.y + this.height

        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += 1
        } else {
            this.velocity.y = 0
        }
    }
}
class Bagr {
    constructor({ position, imagesrc }) {
        this.position = position

        this.image = new Image()
        this.loaded = false

        this.image.onload = () => {
            this.loaded = true
        }

        this.image.src = imagesrc
    }

    draw() {
        if (this.loaded) {
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y
            )
        }
    }
}
const b1 = new Bagr({
    position : {
        x : 0,
        y: 0
    },
    imagesrc: "./img/backgroundLevel1.png"
})

const player = new Player()
const key = {
    w : {
        pressed: false
    },
    d : {
        pressed: false,
    },
    a : {
        pressed: false,
    }

}

function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height);
    b1.draw();
    CollisionBlocks.forEach(collisionBlock => {
    collisionBlock.draw()
})
    player.velocity.x = 0
    if(key.d.pressed){
        player.velocity.x = +5
    }
    else if(key.a.pressed){
        player.velocity.x = -5
    }
    

    player.draw();
    player.update();
}

animate()
window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "KeyW":
            if (player.velocity.y === 0) {
                player.velocity.y = -20
            }
            break

        case "KeyA":
            key.a.pressed = true
            break

        case "KeyD":
            key.d.pressed = true
            break
    }
})
window.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "KeyA":
            key.a.pressed = false
            break

        case "KeyD":
            key.d.pressed = false
            break
    }
})