/*
Name: Brendan Trieu
Game Title: Groom Raider
Total Hours: 14

major components:
Physics (all game objects have physics)
Camera (camera follows player)
Text (UI text)
Animation (all gameobjects have animation)
Tween (when you kill something the points tween upwards and grow)
Timers (difficulty increase)
Sound (jump, shoot, hit, groom_hurt, bride_hurt)

POLISH:
I made the art style feel similar since the images I had only had the church
The people spawn use a math formula (even numbers + 1) to find where on the sprite sheet to take from (since sprites start at 0, 2, 4, 6)
*/

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
let score = 0; highscore = 0; lives = 3;