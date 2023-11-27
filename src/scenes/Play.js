class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        this.load.spritesheet("player", "assets/spritesheet.png", {
            frameWidth: 50
        })
        this.load.image("bride", "assets/bride.png")
        this.load.image("ground", "assets/ground.png")
        this.load.image("background", "assets/background.png")

        this.load.audio("music", "assets/music.mp3")
        this.load.audio("death", "assets/death.wav")
        this.load.audio("jump", "assets/jump.wav")
        this.load.audio("level up", "assets/level up.wav")
    }

    create(){
        this.music = this.sound.add("music", {
            volume: 0.3,
            loop: true
        });
        this.music.play();

        this.background = this.add.image(0, 30, "background").setOrigin(0)

        this.cameras.main.setBounds(0, 0, this.background.width, 150)
        this.physics.world.setBounds(0, 0, this.background.width, 150)

        player = new Player(this, this.background.width / 2, 110, "player", 0)
        this.cameras.main.startFollow(player, false, 0.2, 0.2).setZoom(2.5, 5)

        this.bride = new Bride(this, player.x - 100, player.y, "bride")

        //ground
        let ground = this.physics.add.sprite(0, 140, "ground").setOrigin(0)
        ground.setImmovable(true)
        this.physics.add.collider(player, ground)

        this.difficultyTimer = this.time.addEvent({
            delay: 15000,
            callback: this.levelUp,
            callbackScope: this,
            repeat: 10 //not too hard or it will be impossible
        });

        this.minimum_spawn_time = 100
        this.variation_spawn_time = 80
        this.spawn_time = Math.random() * this.variation_spawn_time + this.minimum_spawn_time

        //obstacles
        this.EnemyGroup = this.add.group({
            runChildUpdate: true
        })
        this.physics.add.collider(this, this.EnemyGroup, ()=>{
            this.collisionDetection()
        })

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        SPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    addEnemy(){
        let which_object = Math.floor(Math.random() * 2)
        let enemy = new Obstacle(this, this.obstacleMoveSpeed, which_object)
        this.EnemyGroup.add(obstacle)
        this.spawn_time = Math.random() * this.variation_spawn_time + this.minimum_spawn_time
    }

    levelUp(){
        this.minimum_spawn_time -= 5;
        this.variation_spawn_time -= 5;
        console.log("level up: " + this.minimum_spawn_time + " min, " + this.variation_spawn_time + " variation")
    }

    update(){
        player.update();
        /*
        this.spawn_time--
        if(this.spawn_time <= 0){
            this.addEnemy()
        }
        */
    }
    collisionDetection(){
        this.alive = false
        this.destroy()
        this.sound.play("death")

        this.time.delayedCall(1500, () => {
            this.music.stop();
            this.scene.start("gameOverScene");
        });
    }

}