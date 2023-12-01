class Person extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        console.log("beginning spawn of person")
        let sprite_name
        if(Phaser.Math.Between(0, 2) == 0){ //random party-goer
            sprite_name = "person_woman"
        }
        else{
            sprite_name = "person_man"
        }
        /*
        let x_pos = Phaser.Math.Between(0, worldWidth)
        while(x_pos > player.x - 250 || x_pos < player.x + 250){ //dont spawn in player's view
            x_pos = Phaser.Math.Between(0, worldWidth)
        }
        console.log("spawn at " + x_pos)
        */
        let x_pos = 500
        super(scene, x_pos, 135, sprite_name)
        let which_person = Math.floor(Math.random() * 3)
        if(which_person % 2 != 0){
            which_person += 1
        }
        this.anims.create({
            key: "move",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(sprite_name, {
                start: which_person,
                end: which_person + 1
            })
        })
        scene.physics.add.existing(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.speed = Phaser.Math.Between(20, 70)
        this.changeDirectionTime = 110
        this.play("move")
    }

    update(){
       this.movement()
    }

    movement(){
        this.changeDirectionTime--
        if(this.changeDirectionTime <= 0){
            let direction
            direction = Phaser.Math.Between(-1, 1)
            this.changeDirectionTime = 110
            this.body.velocity.x = this.speed * direction
            if(direction == -1){
                this.flipX = true
            }
            else if (direction == 1){
                this.flipX = false
            }
        }
    }

    killed(){
        points += Math.floor(100 + (Math.random() * 500))
        let text = this.scene.add.text(this.x, this.y - 30, points, { font: '8px Arial', fill: '#000000' }).setOrigin(0.5).setScale(0.4)
        let basicTween = this.scene.tweens.add({
            targets: text,
            alpha: { from: 1, to: 0 },
            scale: { from: 0.7, to: 1},
            y: text.y - 10,
            ease: 'Sine.easeInOut',
        })
        this.destroy();
    }
}