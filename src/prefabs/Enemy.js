class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, health, speed){
        let y_pos
        let sprite_name
        if(Phaser.Math.Between(0, 1) == 0){
            sprite_name = "police"
            y_pos = 125
        }
        else{
            sprite_name = "heli-police"
            y_pos = 40
        }

        if(Phaser.Math.Between(0, 1) == 0){ //left side
            super(scene, -100, y_pos, sprite_name)
        }
        else{
            super(scene, worldWidth + 100, y_pos, sprite_name)
        }
        this.sprite_name = sprite_name
        scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.body.setSize(20, 50)
        this.setCollideWorldBounds(true)
        this.setPushable(false)
        this.speed = speed
        this.health = health
        this.hitTime = 0 //knockback

        this.hitSound = scene.sound.add("hit")
        if(sprite_name == "police"){
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
            let points = Math.floor(100 + (Math.random() * 500))
            score += points
            let text = this.scene.add.text(this.x, this.y - 30, points, { font: '8px Arial', fill: '#000000' }).setOrigin(0.5).setScale(0.7)
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
            if(this.x < player.x - 40){
                this.flipX = false
                this.body.velocity.x = this.speed / 1.5
            }
            else if(this.x > player.x + 40){
                this.flipX = true
                this.body.velocity.x = -this.speed / 1.5
            }
            else{
                if(this.y < player.y){
                    this.body.velocity.y = this.speed / 1.5
                }
                else if (this.y > player.y){
                    this.body.velocity.y = -this.speed / 1.5
                }
                else{
                    this.body.velocity.y = 0
                }
            }
        }
    }
}