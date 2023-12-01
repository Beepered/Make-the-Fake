class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        this.load.spritesheet("player", "assets/groom_spritesheet.png", {
            frameWidth: 55,
            frameHeight: 50
        })
        this.load.image("bullet", "assets/bullet.png")

        this.load.spritesheet("bride", "assets/bride_spritesheet.png", {
            frameWidth: 55,
            frameHeight: 50
        })

        this.load.image("ground", "assets/ground.png")
        this.load.image("background", "assets/background.png")

        this.load.image("police", "assets/police.png")
        this.load.image("heli-police", "assets/heli-police.png")

        this.load.audio("music", "assets/music.mp3")
        this.load.audio("jump", "assets/jump.wav")
        this.load.audio("shoot", "assets/shoot.wav")
        this.load.audio("hit", "assets/hit.wav")
        this.load.audio("groom_hurt", "assets/groom_hurt.mp3")
        this.load.audio("bride_hurt", "assets/bride_hurt.mp3")
    }

    create(){
        this.scene.launch("UIScene")
        this.music = this.sound.add("music", {
            volume: 0.3,
            loop: true
        });
        this.music.play();

        this.background = this.add.image(0, 50, "background").setOrigin(0)
        
        this.cameras.main.setBounds(0, 0, this.background.width, 170)
        this.physics.world.setBounds(0, 0, this.background.width, 170)
        
        bride = new Bride(this, this.background.width / 2 - 50, 135, "bride")
        
        player = new Player(this, this.background.width / 2, 135, "player", 0)
        this.cameras.main.startFollow(player, false, 0.2, 0.2).setZoom(2.5, 5)
        
        //ground
        let ground = this.physics.add.sprite(0, 160, "ground").setOrigin(0)
        ground.setImmovable(true)
        this.physics.add.collider(player, ground)

        this.difficultyTimer = this.time.addEvent({
            delay: 15000,
            callback: this.levelUp,
            callbackScope: this,
            repeat: 12
        });

        this.minimum_spawn_time = 150
        this.variation_spawn_time = 80
        this.spawn_time = this.minimum_spawn_time + (Math.random() * this.variation_spawn_time)
        this.enemy_health = 3; this.enemy_speed = 60

        this.EnemyGroup = this.add.group({
            runChildUpdate: true
        })
        this.physics.add.overlap(player, this.EnemyGroup, ()=>{
            if(player.invincibleTime <= 0){
                player.killed()
            }
        })

        this.physics.add.overlap(bullet, this.EnemyGroup, (bullet, enemy) => {
            bullet.reset()
            enemy.damage(bullet.body.velocity.x)
        })
        

        this.physics.add.collider(bullet, bride, ()=>{
            bullet.reset()
            bride.killed()
            player.killed()
        });

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        SPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    addEnemy(){
        let enemy = new Enemy(this, this.enemy_health, this.enemy_speed)
        this.EnemyGroup.add(enemy)
        this.spawn_time = this.minimum_spawn_time + (Math.random() * this.variation_spawn_time)
    }

    levelUp(){
        this.minimum_spawn_time -= 7;
        this.variation_spawn_time -= 5;
        this.enemy_speed += 8
        this.enemy_health += 0.3
        console.log("level up: " + this.minimum_spawn_time + " min, " + this.variation_spawn_time + " variation")
    }

    update(){
        player.update();
        bride.update();
        bullet.update();
        
        this.spawn_time--
        if(this.spawn_time <= 0){
            this.addEnemy()
        }
    }
}