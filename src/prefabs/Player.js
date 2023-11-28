class Player extends Phaser.Physics.Arcade.Sprite{
    preload(){
        this.load.spritesheet("player", "assets/spritesheet.png", {
            frameWidth: 50
        })
        //this.game.load.audio("jump", "assets/jump.wav")
        //this.load.audio("jump", "assets/jump.wav")
    }
    
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.body.setSize(20, 50)
        this.movement_speed = 120;
        this.jump_height = -450
        this.gravity = 18
        this.isJumping = false; this.alive = true
        bullet = new Bullet(scene, -10, -10, "bullet")
        this.shootTime = 0

        this.anims.create({
            key: "run",
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 1
            })
        })
    }

    update(){
        if(this.alive){
            if(this.body.touching.down){
                this.isJumping = false
            }
            else{
                this.isJumping = true
            }
            if(this.body.touching.up){
                console.log("top")
            }

            if(keyLEFT.isDown){
                this.body.velocity.x = -this.movement_speed
                this.flipX = true;
            }
            else if(keyRIGHT.isDown){
                this.body.velocity.x = this.movement_speed
                this.flipX = false;
            }
            else{
                this.body.velocity.x = 0
            }
            if(Phaser.Input.Keyboard.JustDown(keyUP) && !this.isJumping){
                //this.sound.play("jump")
                this.body.velocity.y = this.jump_height
            }
            if(this.body.velocity.y == 0 && !this.isJumping){
                this.play("run", true)
            }
            if(Phaser.Input.Keyboard.JustDown(SPACEBAR) && this.shootTime < 0){
                //this.play("shoot", true)
                //this.sound.play("shoot")
                this.killed()
                bullet.shoot(this.x, this.y, this.flipX);
                this.shootTime = 60
            }
            this.shootTime--

            this.body.velocity.y += this.gravity
        }
    }

    killed(){
        //groom says OH NO
        lives--
        //this.alive = false
        this.body.velocity.x = 0
        this.anims.stop();
        if(lives == 0){
            scene.start("gameOverScene");
        }

        //this.play("death")
        //this.sound.play("death")
    }
}