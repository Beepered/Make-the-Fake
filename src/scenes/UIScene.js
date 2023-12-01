class UIScene extends Phaser.Scene
{
    constructor (){
        super("UIScene");
    }

    preload(){
        this.load.image("lives_image","assets/lives.png")
    }

    create (){
        this.groom_raider_text = this.add.text(120, 50, 'GROOM RAIDER', { font: '20px Arial', fill: '#FF0000' }).setOrigin(0.5)
        this.point_text = this.add.text(120, 75, '0', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5)

        this.score_text = this.add.text(400, 50, 'HIGH SCORE', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5)
        this.highscore_text = this.add.text(400, 75, highscore.toString().padStart(10, '0'), { font: '20px Arial', fill: '#000000' }).setOrigin(0.5)

        this.add.sprite(580,60,"lives_image").setOrigin(0.5).setScale(4)
        this.lives_text = this.add.text(630, 50, 'X 0', { font: '35px Arial', fill: '#000000' }).setOrigin(0.5)
    }
    
    update(){
        this.point_text.text = points.toString().padStart(10, '0')
        this.lives_text.text = "X" + lives
    }

}