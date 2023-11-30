class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.physics.add.existing(this);
        scene.add.existing(this)
        this.setCollideWorldBounds(true);
        this.speed = 350
        this.checkWorldBounds = true;
    }

    shoot(x, y, direction) {
		this.x = x
        this.y = y

		this.setActive(true);
		this.setVisible(true);
        this.body.velocity.x = this.speed * direction
	}

    update() {
        /*
		if (this.x <= 0 || this.x >= game.config.width) {
            this.body.velocity.x = 0
			this.setActive(false);
			this.setVisible(false);
		}
        */
	}

    reset(){
        this.x = -10; this.y = -10
        this.setActive(false)
        this.setVisible(false)
    }

}