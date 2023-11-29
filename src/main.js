/*
Name: Brendan Trieu
Game Title: Groom Raider
Total Hours: 10

major components: Physics, Camera, Text, Animation, Timers, Sound
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

let keyUP, keyDOWN, keyLEFT, keyRIGHT, SPACEBAR;
let player, bullet, bride
let points = 0; highscore = 0; lives = 3;