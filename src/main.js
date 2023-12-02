/*
Name: Brendan Trieu
Game Title: Groom Raider
Total Hours: 14

major components:
Physics (all game objects have physics)
Camera (camera follows player)
Text (UI text)
Animation (all gameobjects have animation)
Timers (difficulty increase)
Sound (jump, shoot, hit, groom_hurt, bride_hurt)
*/

let config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    physics:{
        default: "arcade",
        arcade:{
            debug:true
        }
    },
    width: 750,
    height: 600,
    backgroundColor: "#C5DBF9",
    scene: [Menu, Credits, Play, UIScene, GameOver]
}

let game = new Phaser.Game(config);
let gameHeight = game.config.height
let gameWidth = game.config.width
let worldWidth

let keyUP, keyDOWN, keyLEFT, keyRIGHT, SPACEBAR;
let player, bullet, bride
let score = 0; highscore = 0; lives = 3;