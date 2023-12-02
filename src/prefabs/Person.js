class Person extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        let sprite_name
        if(Phaser.Math.Between(0, 1) == 0){ //random party-goer
            sprite_name = "person_woman"
        }
        else{
            sprite_name = "person_man"
        }
        let x_pos
        if(Phaser.Math.Between(0, 1) == 0){
            x_pos = player.x - 250
        }
        else{
            x_pos = player.x + 250
        }
        super(scene, x_pos, 135, sprite_name)
        this.which_person = Math.floor(Math.random() * 3)
        if(this.which_person % 2 != 0){
            this.which_person += 1
        }
        this.anims.create({
            key: "move",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(sprite_name, {
                start: this.which_person,
                end: this.which_person + 1
            })
        })
        scene.physics.add.existing(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setPushable(false)

        this.speed = Phaser.Math.Between(20, 60)
        this.changeDirectionTime = 140
        this.hitSound = scene.sound.add("hit")
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
            if(this.which_person >= 8){ //only the men characters flip around
                if(direction == -1){
                    this.flipX = true
                }
                else if (direction == 1){
                    this.flipX = false
                }
            }
        }
    }

    killed(){
        this.hitSound.play()
        let points = Math.floor(400 + (Math.random() * 500))
        score += points
        let text = this.scene.add.text(this.x, this.y - 30, points, { font: '8px Arial', fill: '#000000' }).setOrigin(0.5).setScale(0.7)
        let basicTween = this.scene.tweens.add({
            targets: text,
            alpha: { from: 1, to: 0 },
            scale: { from: 0.7, to: 1},
            y: text.y - 10,
            ease: 'Sine.easeInOut',
        })
        this.destroy()
    }
}