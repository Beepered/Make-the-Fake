class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene")
    }

    create(){
        let textConfig = {
            fontFamily: "Montserrat",
            fontSize: "30px",
            color: "#000000",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
        }
        this.add.text(gameWidth / 2, gameHeight / 2.2, "GAME OVER", textConfig).setOrigin(0.5)
        this.add.text(gameWidth / 2, gameHeight / 1.8, "press UP to go to MENU", textConfig).setOrigin(0.5)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.scene.start('menuScene')
        }
    }
}