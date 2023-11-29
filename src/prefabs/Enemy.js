class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, health, speed){
        let sprite_name
        let rand_int = Phaser.Math.Between(0, 2)
        if(rand_int == 0){
            sprite_name = "police"
        }
        else{
            sprite_name = "heli-police"
        }

        let rand_side = Phaser.Math.Between(0, 2)
        if(rand_side == 0){
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
        this.hitTime = 0
    }

    update(){
        if(this.hitTime <= 0){
            if(this.x < player.x){
                this.body.velocity.x = this.speed
            }
            else if(this.x > player.x){
                this.body.velocity.x = -this.speed
            }
        }
        if(this.health <= 0){
            object.destroy();
        }
        this.hitTime--
    }

    damage(bulletVelocity){
        this.health--
        this.hitTime = 20
        this.body.velocity.x = bulletVelocity / 5 //pushback dependent on bullet speed
    }
}