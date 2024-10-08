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
        this.load.image("surprise", "assets/surprise.png")

        this.load.image("ground", "assets/ground.png")
        this.load.image("background", "assets/background.png")

        this.load.spritesheet("police", "assets/police.png", {
            frameWidth: 38,
            frameHeight: 50
        })
        this.load.spritesheet("heli-police", "assets/heli-police.png", {
            frameWidth: 38,
            frameHeight: 50
        })

        this.load.spritesheet("person_woman", "assets/person_woman.png", {
            frameWidth: 37,
            frameHeight: 50
        })
        this.load.spritesheet("person_man", "assets/person_man.png", {
            frameWidth: 34,
            frameHeight: 50
        })

        this.load.audio("music", "assets/music.mp3")
        this.load.audio("jump", "assets/jump.wav")
        this.load.audio("shoot", "assets/shoot.wav")
        this.load.audio("hit", "assets/hit.wav")
        this.load.audio("groom_hurt", "assets/groom_hurt.mp3")
        this.load.audio("bride_hurt", "assets/bride_hurt.mp3")
    }

    create(){
        console.log(Phaser.VERSION)
        this.scene.launch("UIScene") //display lives and points at top of screen
        this.music = this.sound.add("music", {
            volume: 0.1,
            loop: true
        });
        this.music.play();

        this.background = this.add.image(0, 40, "background").setOrigin(0)
        worldWidth = this.background.width
        
        //setting camera and collision based on size of background
        this.cameras.main.setBounds(0, 0, worldWidth, 170)
        this.physics.world.setBounds(0, 0, worldWidth, 170)
        
        bride = new Bride(this, worldWidth / 2 - 50, 125, "bride", 3)
        
        player = new Player(this, worldWidth / 2, 125, "player", 2)
        this.cameras.main.startFollow(player, false).setZoom(3.5, 3.5) //let camera follow player
        
        //  ground
        let ground = this.physics.add.sprite(0, 150, "ground").setOrigin(0)
        ground.setImmovable(true)
        this.physics.add.collider(player, ground)

        //increase difficulty every 15 seconds
        this.difficultyTimer = this.time.addEvent({
            delay: 15000,
            callback: this.levelUp,
            callbackScope: this,
            repeat: 12
        });

        //  COLLISION
        this.physics.add.collider(bullet, bride, ()=>{
            bullet.reset()
            bride.killed()
            player.killed()
        });

        //  enemy spawn and data
        this.minimum_spawn_time = 1.4
        this.variation_spawn_time = 1.5
        this.spawn_time = this.minimum_spawn_time + (Math.random() * this.variation_spawn_time)
        this.enemy_health = 0.1; this.enemy_speed = 60

        this.EnemyGroup = this.add.group({
            runChildUpdate: true
        })
        this.physics.add.overlap(player, this.EnemyGroup, ()=>{
            player.killed()
        })

        this.physics.add.overlap(bullet, this.EnemyGroup, (bullet, enemy) => {
            bullet.reset()
            enemy.damage(bullet)
        })

        //people spawn
        this.minimum_person_spawn_time = 6
        this.variation_person_spawn_time = 3
        this.person_spawn_time = this.minimum_person_spawn_time + (Math.random() * this.variation_person_spawn_time)

        this.PersonGroup = this.add.group({
            runChildUpdate: true
        })
        this.physics.add.collider(bullet, this.PersonGroup, (bullet, person)=>{
            bullet.reset()
            person.killed()
        });

        //controls
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

    addPerson(){
        let person = new Person(this)
        this.PersonGroup.add(person)
        this.person_spawn_time = this.minimum_person_spawn_time + (Math.random() * this.variation_person_spawn_time)
    }

    levelUp(){
        this.minimum_spawn_time -= 0.08;
        this.variation_spawn_time -= 0.09;
        this.enemy_speed += 7
        this.enemy_health += 0.2
    }

    update(time, delta){
        player.update();
        bride.update();
        bullet.update();
        
        this.spawn_time -= delta * 0.001
        if(this.spawn_time <= 0){
            this.addEnemy()
        }
        this.person_spawn_time -= delta * 0.001
        if(this.person_spawn_time <= 0){
            this.addPerson()
        }
    }
}