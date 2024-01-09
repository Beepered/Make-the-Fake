class Instruction extends Phaser.Scene{
    constructor(){
        super("instructionScene")
    }
    preload(){
        this.load.bitmapFont("Pixel", "assets/pixel font.png", "assets/pixel font.xml")

        this.load.spritesheet("player", "assets/groom_spritesheet.png", {
            frameWidth: 55,
            frameHeight: 50
        })
        this.load.image("arrow", "assets/arrow.png")
    }

    create(){
        this.add.bitmapText(gameWidth / 2, 40, "Pixel", "INSTRUCTIONS", 22).setOrigin(0.5).setTintFill(0xFF0000)
        this.add.bitmapText(gameWidth / 2, 70, "Pixel", "press SPACEBAR for MENU", 20).setOrigin(0.5)

        this.add.sprite(230, 300, 'player', 2).setScale(3)
        this.add.sprite(225, 180, "arrow").setScale(2).setOrigin(0.5) //up arrow
        this.add.sprite(110, 300, "arrow").setScale(2).setOrigin(0.5).angle = -90 //left arrow
        this.add.sprite(350, 300, "arrow").setScale(2).setOrigin(0.5).angle = 90 //right arrow
        this.add.bitmapText(230, 420, "Pixel", "arrow keys", 18).setOrigin(0.5)

        this.add.sprite(550, 300, 'player', 3).setScale(3)
        this.add.bitmapText(550, 420, "Pixel", "SPACEBAR", 18).setOrigin(0.5)

        SPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(SPACEBAR)){
            this.scene.start("menuScene")
        }
    }
}