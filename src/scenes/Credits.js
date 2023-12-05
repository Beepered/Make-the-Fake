class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene")
    }

    create(){
        let titleConfig = {
            fontFamily: "Montserrat",
            fontSize: "35px",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
        }
        let textConfig = {
            fontFamily: "Montserrat",
            fontSize: "22px",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
        }
        this.add.text(gameWidth / 2, 40, "CREDITS", titleConfig).setOrigin(0.5)
        this.add.text(gameWidth / 2, 70, "Press UP for MENU", textConfig).setOrigin(0.5)
        this.add.text(gameWidth / 2, gameHeight / 2,
            "Programming/Art/Game Design by Brendan Trieu\n\n" +
            "Menu Scene music: Science Documentary by Lexin_Music\n\n" +
            "Play Scene music: Beyond Infinity by Blender Time\n\n" +
            "Programming in Phaser/JS\n\n" +
            "Art made in Krita\n\n" +
            "Sound effects made in sfxr.me", textConfig).setOrigin(0.5)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyUP)){ 
            this.scene.start("menuScene")
        }
    }
}