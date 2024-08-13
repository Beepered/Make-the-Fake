class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.body.setSize(20, 48)
        this.setCollideWorldBounds(true)
        
        //stats
        this.movement_speed = 160;
        this.jump_height = -650
        this.gravity = 18
        this.isJumping = false; this.alive = true;
        bullet = new Bullet(scene, -10, -10, "bullet")
        this.canShoot = true; this.invincible = false
        this.direction = 1 //direction player is facing so the bullet knows where to go

        //adding sounds and animation
        this.jumpSound = scene.sound.add("jump") 
        this.shootSound = scene.sound.add("shoot")
        this.hurtSound = scene.sound.add("groom_hurt")
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player", {
                start: 2,
                end: 2
            })
        })
        this.anims.create({
            key: "move",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: "shoot",
            frames: this.anims.generateFrameNumbers("player", {
                start: 3,
                end: 3
            })
        })
    }
    update(){
        if(this.alive){
            this.movement()
            this.shoot()
        }
        this.body.velocity.y += this.gravity
    }

    movement(){
        if(this.body.touching.down){ //preventing "double" jumping
            this.isJumping = false
        }
        else{
            this.isJumping = true
        }

        //movement
        if (keyLEFT.isDown) {
            this.direction = -1
            this.body.velocity.x = -this.movement_speed
            this.flipX = true;
            if (this.canShoot) { //play move animation only when not shooting
                this.play("move", true)
            }
        }
        else if (keyRIGHT.isDown) {
            this.direction = 1
            this.body.velocity.x = this.movement_speed
            this.flipX = false;
            if (this.canShoot) {
                this.play("move", true)
            }
        }
        else {
            this.body.velocity.x = 0
            if (this.canShoot) {
                this.play("idle")
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keyUP) && !this.isJumping){ //jump
            this.jumpSound.play()
            this.body.velocity.y = this.jump_height
        }
    }

    shoot(){
        if(Phaser.Input.Keyboard.JustDown(SPACEBAR) && this.canShoot){ //shooting
            this.play("shoot")
            this.shootSound.play()
            this.canShoot = false
            bullet.shoot(this.x + (15 * this.direction), this.y - 10, this.direction);
            this.scene.time.delayedCall(500, () => {
                this.canShoot = true
            })
        }
    }

    killed(){
        if(!this.invincible){
            this.hurtSound.play()
            lives--
            this.alive = false
            this.invincible = true
            this.body.velocity.x = 0
            this.body.velocity.y = -170 //jump up a little
            this.anims.stop();
            this.scene.time.delayedCall(1800, () => {
                this.invincible = false
            })
            this.scene.time.delayedCall(1300, () => { //have some time before giving control back to player
                if (lives == 0) { //no more lives
                    if (score > parseInt(localStorage.getItem('highscore'))) { //save highscore to local storage
                        localStorage.setItem('highscore', score)
                    }
                    this.scene.music.stop();
                    this.scene.scene.start("menuScene");
                    this.scene.scene.stop("UIScene")
                }
                this.alive = true
            });
        }
    }
    
}