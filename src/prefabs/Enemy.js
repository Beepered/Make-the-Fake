class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, speed, health, left){
        let rand_int = Phaser.Math.Between(0, 2)
        if(rand_int == 0){
            sprite_name = "police"
        }
        else{
            sprite_name = "heli-police"
        }
        if(left){
            super(scene, -100, 110, sprite_name)
        }
        else{
            super(scene, 100, 110, sprite_name)
        }
        
        scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.speed = speed
        this.health = health
    }

    update(){
        if(this.x < player){
            this.body.velocity.x = this.speed
        }
        else if(this.x > player.x){
            this.body.velocity.x = -this.speed
        }
        if(this.health <= 0){
            object.destroy();
        }
    }
}