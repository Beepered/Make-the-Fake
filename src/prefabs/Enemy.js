class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, health, speed){
        let rand_int = Phaser.Math.Between(0, 2)
        let y_pos
        let sprite_name
        if(rand_int == 0){
            sprite_name = "police"
            y_pos = 135
        }
        else{
            sprite_name = "heli-police"
            y_pos = 50
        }

        let rand_side = Phaser.Math.Between(0, 2)
        if(rand_side == 0){
            super(scene, -100, y_pos, sprite_name)
        }
        else{
            super(scene, 1500, y_pos, sprite_name)
        }
        this.sprite_name = sprite_name
        scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setPushable(false)
        this.speed = speed
        this.health = health
        this.hitTime = 0 //knockback

        this.hitSound = scene.sound.add("hit")
        if(rand_int == 0){
            this.anims.create({
                key: "move",
                frameRate: 4,
                repeat: -1,
                frames: this.anims.generateFrameNumbers("police", {
                    start: 0,
                    end: 1
                })
            })
        }
        else{
            this.anims.create({
                key: "move",
                frameRate: 4,
                repeat: -1,
                frames: this.anims.generateFrameNumbers("heli-police", {
                    start: 0,
                    end: 1
                })
            })
        }
        this.play("move")
    }

    update(){
        if(this.hitTime <= 0){
            this.movement()
        }
        this.hitTime--
    }

    damage(bullet){
        this.hitSound.play()
        this.hitTime = 15
        this.body.velocity.x = bullet.body.velocity.x / 5 //pushback dependent on bullet speed
        
        this.health--
        if(this.health <= 0){
            points += Math.floor(100 + (Math.random() * 500))
            let text = this.scene.add.text(this.x, this.y - 30, points, { font: '8px Arial', fill: '#000000' }).setOrigin(0.5).setScale(0.4)
            let basicTween = this.scene.tweens.add({
                targets: text,
                alpha: { from: 1, to: 0 },
                scale: { from: 0.4, to: 1},
                y: text.y - 25,
                ease: 'Sine.easeInOut',
            })
            this.destroy();
        }
    }

    movement(){
        if(this.sprite_name == "police"){
            if(this.x < player.x - 5){
                this.flipX = false
                this.body.velocity.x = this.speed
            }
            else if(this.x > player.x + 5){
                this.flipX = true
                this.body.velocity.x = -this.speed
            }
            else{
                this.body.velocity.x = 0
            }
        }
        else if (this.sprite_name == "heli-police"){
            if(this.x < player.x - 30){
                this.flipX = false
                this.body.velocity.x = this.speed / 1.5
            }
            else if(this.x > player.x + 30){
                this.flipX = true
                this.body.velocity.x = -this.speed / 1.5
            }
            else{
                this.body.velocity.y = 15
            }
        }
    }
}