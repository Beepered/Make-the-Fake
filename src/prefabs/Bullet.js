class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.physics.add.existing(this);
        this.scene.add.existing(this)
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
		if (this.x <= 0) {
            this.body.velocity.x = 0
			this.setActive(false);
			this.setVisible(false);
		}
	}

}