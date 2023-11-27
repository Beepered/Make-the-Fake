class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.physics.add.existing(this);
        this.body.setSize(10, 10)
        this.speed = 250
    }

    shoot(x, y, direction) {
		this.x = x
        this.y = y

		this.setActive(true);
		this.setVisible(true);

        if(direction){ //if flipX
            this.body.velocity.x = -this.speed
        }
        else{
            this.body.velocity.x = this.speed
        }
	}

    update() {
        console.log(this.x)
		if (this.x <= 0) {
            console.log("dead")
			this.setActive(false);
			this.setVisible(false);
		}
	}

}