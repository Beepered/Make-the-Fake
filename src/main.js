/*
Name: Brendan Trieu
Game Title: 
Total Hours: 6


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
    scene: [Menu, Credits, Play, GameOver]
}

let game = new Phaser.Game(config);
let gameHeight = game.config.height
let gameWidth = game.config.width

let keyUP, keyDOWN, keyLEFT, keyRIGHT, SPACEBAR;
let player