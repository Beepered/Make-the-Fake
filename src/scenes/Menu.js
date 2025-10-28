class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.audio("menu_music", "assets/menu_music.mp3");
    this.load.bitmapFont(
      "Pixel",
      "assets/pixel font.png",
      "assets/pixel font.xml"
    );

    this.load.image("bullet", "assets/bullet.png");
    this.load.image("arrow", "assets/arrow.png");
  }

  create() {
    score = 0;
    lives = 3;
    this.music = this.sound.add("menu_music", {
      volume: 0.2,
      loop: true,
    });
    this.music.play();

    //text
    this.add
      .bitmapText(gameWidth / 2, gameHeight / 3, "Pixel", "Groom Raider", 55)
      .setOrigin(0.5)
      .setTintFill(0xff0000);

    //menu selection
    this.cursor = this.physics.add
      .sprite(190, gameHeight / 2, "bullet")
      .setScale(3);
    this.cursor_location = 0;
    this.add
      .bitmapText(210, gameHeight / 2, "Pixel", "PLAY", 25)
      .setOrigin(0, 0.5);
    this.add
      .bitmapText(210, gameHeight / 1.75, "Pixel", "INSTRUCTIONS", 25)
      .setOrigin(0, 0.5);
    this.add
      .bitmapText(210, gameHeight / 1.55, "Pixel", "CREDITS", 25)
      .setOrigin(0, 0.5);

    this.add
      .sprite(100, gameHeight / 1.2, "arrow")
      .setScale(2)
      .setOrigin(0.5);
    this.add
      .sprite(140, gameHeight / 1.2, "arrow")
      .setScale(2)
      .setOrigin(0.5).flipY = true;
    this.add
      .bitmapText(230, gameHeight / 1.2, "Pixel", "- move", 18)
      .setOrigin(0.5)
      .setTintFill(0xffffff);

    this.add
      .bitmapText(520, gameHeight / 1.2, "Pixel", "SPACEBAR - select", 18)
      .setOrigin(0.5)
      .setTintFill(0xffffff);

    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    SPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyUP) && this.cursor_location > 0) {
      this.cursor.y -= 45;
      this.cursor_location--;
    } else if (
      Phaser.Input.Keyboard.JustDown(keyDOWN) &&
      this.cursor_location < 2
    ) {
      this.cursor.y += 45;
      this.cursor_location++;
    } else if (Phaser.Input.Keyboard.JustDown(SPACEBAR)) {
      if (this.cursor_location == 0) {
        this.game.sound.stopAll();
        this.scene.start("playScene");
      } else if (this.cursor_location == 1) {
        this.scene.start("instructionScene");
      } else {
        this.scene.start("creditScene");
      }
    }
  }
}
