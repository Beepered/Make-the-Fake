let config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    physics:{
        default: "arcade",
        arcade:{
            debug:false
        }
    },
    width: 750,
    height: 600,
    backgroundColor: "#C5DBF9",
    scene: [Menu, Instruction, Credits, Play, UIScene]
}

let game = new Phaser.Game(config);
let gameHeight = game.config.height
let gameWidth = game.config.width
let worldWidth

let keyUP, keyDOWN, keyLEFT, keyRIGHT, SPACEBAR;
let player, bullet, bride
let score = 0; highscore = 0; lives = 3; lives_score = 20000;