class Person extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.physics.add.existing(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.speed = 40
    }

    update(){
       this.movement()
    }

    movement(){
        /*
        if(this.x < player.x - 90){
            this.body.velocity.x = this.speed
        }
        else if (this.x > player.x + 90){
            this.body.velocity.x = -this.speed
        }
        */
    }

    die(){
        points += Math.floor(100 + (Math.random() * 500))
        this.destroy();
    }
}