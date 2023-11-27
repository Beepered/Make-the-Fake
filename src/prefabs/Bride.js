class Bride extends Phaser.Physics.Arcade.Sprite{
    preload(){
        //this.load.audio("death", "assets/bride_death.wav")
    }

    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.alive = true
    }

    update(){
        if(this.alive){
            if(this.x < player.x - 50){
                this.body.velocity.x = 30
            }
            else if(this.x > player.x + 50){
                this.body.velocity.x = -30
            }
            else{
                this.body.velocity.x = 0
            }
        }
    }

    killed(){
        this.alive = false
        this.body.velocity.x = 0
        //this.play("death")
        //this.sound.play("death")
    }
}