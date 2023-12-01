class Person extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        let rand_int = Phaser.Math.Between(0, 2)
        let sprite_name
        if(rand_int == 0){ //random party-goer
            sprite_name = ""
        }
        else{
            sprite_name = ""
        }
        let x_pos = Phaser.Math.Between(0, worldWidth)
        while(x_pos > player.x - 250 || x_pos < player.x + 250){ //dont spawn in player's view
            x_pos = Phaser.Math.Between(0, worldWidth)
        }
        console.log("spawn at " + x_pos)
        super(scene, x_pos, 120, sprite_name)
        scene.physics.add.existing(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.speed = Phaser.Math.Between(30, 50)
        this.changeDirectionTime = 40
    }

    update(){
       this.movement()
       this.changeDirectionTime--
    }

    movement(){
        if(this.changeDirectionTime <= 0){
            direction = Phaser.Math.Between(-1, 1)
            this.changeDirectionTime = 40
        }
        this.body.velocity.x = this.speed * direction
    }

    killed(){
        points += Math.floor(100 + (Math.random() * 500))
        let text = this.scene.add.text(this.x, this.y - 40, points, { font: '10px Arial', fill: '#000000' }).setOrigin(0.5)
        let basicTween = this.scene.tweens.add({
            targets: text,
            alpha: { from: 1, to: 0 },
            scale: { from: 0.3, to: 1},
            y: text.y - 20,
            ease: 'Sine.easeInOut',
        })
        this.destroy();
    }
}