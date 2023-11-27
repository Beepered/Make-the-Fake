class Bride extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true)
    }
}