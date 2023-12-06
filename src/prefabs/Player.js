class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this)
        scene.physics.add.existing(this);
        this.body.setSize(20, 48)
        this.setCollideWorldBounds(true)
        
        this.movement_speed = 130;
        this.jump_height = -450
        this.gravity = 18
        this.isJumping = false; this.alive = true;
        bullet = new Bullet(scene, -10, -10, "bullet")
        this.shootTime = 0; this.maxShootTime = 50; this.shootAnimTime = 0
        this.invincibleTime = 0
        this.direction = 1

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
            if(this.body.touching.down){
                this.isJumping = false
            }
            else{
                this.isJumping = true
            }

            if(this.shootAnimTime <= 0){
                if(keyLEFT.isDown){
                    this.direction = -1
                    this.body.velocity.x = -this.movement_speed
                    this.flipX = true;
                    this.play("move", true)
                }
                else if(keyRIGHT.isDown){
                    this.direction = 1
                    this.body.velocity.x = this.movement_speed
                    this.flipX = false;
                    this.play("move", true)
                }
                else{
                    this.body.velocity.x = 0
                    this.play("idle")
                }
            }
            if(Phaser.Input.Keyboard.JustDown(keyUP) && !this.isJumping){
                this.jumpSound.play()
                this.body.velocity.y = this.jump_height
            }
            if(Phaser.Input.Keyboard.JustDown(SPACEBAR) && this.shootTime < 0){
                this.play("shoot")
                this.shootSound.play()
                this.shootAnimTime = 15
                bullet.shoot(this.x + (15 * this.direction), this.y - 10, this.direction);
                this.shootTime = this.maxShootTime
            }
            if(this.invincibleTime <= 0){
                this.clearTint()
            }
        }
        this.body.velocity.y += this.gravity
        this.invincibleTime--
        this.shootTime--; this.shootAnimTime--
    }

    killed(){
        this.hurtSound.play()
        lives--
        this.alive = false
        this.invincibleTime = 180
        this.body.velocity.x = 0
        this.body.velocity.y = -170
        this.anims.stop();
        this.scene.time.delayedCall(1300, () => {
            if(lives == 0){
                if(score > parseInt(localStorage.getItem('highscore'))){
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