class UIScene extends Phaser.Scene
{
    //display this above the play scene
    constructor (){
        super("UIScene");
    }

    preload(){
        this.load.image("lives_image","assets/lives.png")
        this.load.bitmapFont("Pixel", "assets/pixel font.png", "assets/pixel font.xml")
    }

    create (){
        this.groom_raider_text = this.add.bitmapText(160, 50, "Pixel", "GROOM RAIDER", 16).setOrigin(0.5).setTintFill(0xFF0000)
        this.score_text = this.add.bitmapText(160, 75, "Pixel", score.toString().padStart(10, '0'), 16).setOrigin(0.5)

        this.HIGHSCORE_text = this.add.bitmapText(400, 50, "Pixel", "HIGH SCORE", 16).setOrigin(0.5)
        this.highscore_text = this.add.bitmapText(400, 75, "Pixel", parseInt(localStorage.getItem('highscore')).toString().padStart(10, '0'), 16).setOrigin(0.5)

        this.add.sprite(580, 60, "lives_image").setOrigin(0.5).setScale(4)
        this.lives_text = this.add.bitmapText(640, 55, "Pixel", 'X 0', 25).setOrigin(0.5)
    }
    
    update(){
        this.score_text.text = score.toString().padStart(10, '0')
        this.lives_text.text = "X" + lives
    }

}