class Menu extends Phaser.Scene 
{
    constructor() 
    {
        super("menuScene")
    }

    preload() 
    {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        //NEW added spaceship
        //The W H I T E ship
        this.load.image('fastSpaceShipMK2', './assets/fastSpaceShipMK2.png')
        this.load.image('starfield', './assets/starfield.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        //new EXplosive audio
        this.load.audio('explosion2', './assets/explosion2.wav')
        this.load.audio('explosion3', './assets/explosion3.wav')
        this.load.audio('explosion4', './assets/explosion4.wav')
        this.load.audio('explosion5', './assets/explosion5.wav')
        //load Background music??
        this.load.audio('FirstDegree','./assets/tommy-wright-iii-murder-in-da-first-dgree-type-cowbell-melody_143bpm_B_minor.wav')
        //load background muisc for menu...
        //this.load.audio('TypeCowbell', './assets/tommy-wright-iii-type-cowbell-melody_140bpm_D_minor.wav')
        //TOMMY MF WRIGHT
        //this.load.audio('TWright', './assets/tommy-wright-memphis-acapella_134bpm_D_minor.wav')
    }


    create() 
    {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice OR -> for Expert', menuConfig).setOrigin(0.5)
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

    }



    update() 
    {
        //We gonna try to increase speed in both easy and hard mode after 30 seconds...
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) 
        {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            fastSpeed: 5,
            gameTimer: 60000    
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) 
        {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            fastSpeed: 7,
            gameTimer: 45000    
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
    }
}

