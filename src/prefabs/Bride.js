class Bride extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setSize(35, 50)
        this.setCollideWorldBounds(true)
        this.setPushable(false)
        this.can_move = true
        this.speed = 40

        this.hurtSound = scene.sound.add("bride_hurt")

        this.surprise =  this.scene.add.sprite(this.x, this.y - 50, "surprise")
        this.surprise.setVisible(false)

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("bride", {
                start: 3,
                end: 3
            })
        })
        this.anims.create({
            key: "move",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bride", {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: "surprised",
            frames: this.anims.generateFrameNumbers("bride", {
                start: 2,
                end: 2
            })
        })
    }

    update(){
        this.surprise.x = this.x
        if(this.can_move){
            if(this.x < player.x - 50){
                this.play("move", true)
                this.body.velocity.x = this.speed
            }
            else if(this.x > player.x + 50){
                this.play("move", true)
                this.body.velocity.x = -this.speed
            }
            else{
                this.play("idle")
                this.body.velocity.x = 0
            }
        }
    }

    killed(){
        this.can_move = false
        this.body.velocity.x = 0
        this.surprised()
        this.hurtSound.play()
    }

    surprised(){
        this.play("surprised")
        this.surprise.setVisible(true)
        this.scene.time.delayedCall(1000, () => {
            this.can_move = true
            this.surprise.setVisible(false)
        });
    }
}