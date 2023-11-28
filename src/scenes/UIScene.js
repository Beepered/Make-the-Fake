class UIScene extends Phaser.Scene
{
    constructor (){
        super("UIScene");
    }

    create (){
        this.point_text = this.add.text(50, 30, '0', { font: '30px Arial', fill: '#000000' });
        this.highscore_text = this.add.text(350, 30, '0', { font: '30px Arial', fill: '#000000' });
        this.lives_text = this.add.text(700, 30, '0', { font: '30px Arial', fill: '#000000' });
    }
    
    update(){
        this.point_text.text = points
        this.highscore_text.text = highscore
        this.lives_text.text = lives
    }

}