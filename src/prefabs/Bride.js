class Bride extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.physics.add.existing(this)
        scene.add.existing(this)
        this.body.setSize(35, 50)
        this.setCollideWorldBounds(true)
        this.alive = true
        this.speed = 35

        this.hurtSound = scene.sound.add("bride_hurt")

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("bride", {
                start: 3,
                end: 3
            })
        })
        this.anims.create({
            key: "move",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bride", {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: "surprised",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bride", {
                start: 2,
                end: 2
            })
        })
    }

    update(){
        if(this.alive){
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
        this.alive = false
        this.body.velocity.x = 0
        this.play("surprised")
        this.hurtSound.play()
        this.scene.time.delayedCall(1500, () => {
            this.alive = true
        });
    }
}