class Play extends Phaser.Scene 
{
    constructor() 
    {
        super("playScene")
    }

    preload()
    {
        //load Background music??
        //this.load.audio('FirstDegree','./assets/tommy-wright-iii-murder-in-da-first-dgree-type-cowbell-melody_143bpm_B_minor.wav')
        //load fastSpaceship
        //this.load.image('fastSpaceship', './assets/fastSpaceship.png')
        this.load.audio('TypeCowbell', './assets/tommy-wright-iii-type-cowbell-melody_140bpm_D_minor.wav')
        this.load.audio('TWright', './assets/tommy-wright-memphis-acapella_134bpm_D_minor.wav')
    }

    create() 
    {
        //Menu Music
        let menuMusicConfig = {
            rate: 1,
            volume: 0.5,
            loop: true,
        }
        this.menuMusic = this.sound.add('TypeCowbell', menuMusicConfig)
        this.menuMusic.play()

        let musicConfig = {
            rate: 1,
            volume: 1.5,
            loop: true,
        }
        this.music = this.sound.add('TWright', musicConfig)


         
        //Highest Score
        //this.HighScore = 0
        //Could we put the Menu Music 'First Degree inside the Play scene also? //Loop it after we enter playScene


        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        // green UI background
        //Changed: borderUISize + borderPadding -> borderUISize + borderPadding, borderUISize * 2 -> * 3
        this.add.rectangle(0, borderUISize - borderPadding, game.config.width, borderUISize * 3, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)

        //define New FAST SPACESHIP
        this.ship04 = new fastSpaceShip(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*2, 'fastSpaceShipMK2', 0, 60).setOrigin(0,0)


        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)



        // initialize score
        this.p1Score = 0 //I want to include 'Score:' into this also.....
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding* 2.5,'Score:' + this.p1Score, scoreConfig)

        //Intialize "FIRE" MOD in UI
        this.P1Fire = "FIRE"
        //Display FIRE button //HOW IT LOOKS BROOO
        let FireConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center', //literally how big the bare fits on the word "FIRE"
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 //Size of the orange bar in FIRE
        }
        this.FireCenter = this.add.text(borderUISize + borderPadding * 24, borderUISize + borderPadding * 4, this.P1Fire, FireConfig).setOrigin(0.5)
        this.FireCenter.alpha = 0 //NO SHOW 'FIRE' in the start of game

        //Highest Score
        this.HighScore = 0

        let HighScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 210
        }
        this.HighScoreRight = this.add.text(borderUISize + borderPadding * 40, borderUISize + borderPadding * 4,'HighScore:' + this.HighScore, HighScoreConfig).setOrigin(0.5)//The actual in-game text for "Highscore: "
        this.HighScoreRight.alpha = 1 //Make sure it shows on start


        // GAME OVER flag
        this.gameOver = false




        // 60-second play clock //2 min?
        scoreConfig.fixedWidth = 0 //just show score: 0 when game over


        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)


        //WE FINNA IMPLEMENT THE CLOCK THAT WILL ADD TIME TO US IF WE HIT ROCKET AND SUBTRACT IF MISSES

        this.clockTimeRemain = Math.ceil(this.clock.getRemainingSeconds()) //I'm calling a function instead of using value so that's why it doesn't want to show 'Timer'
        //WE STRAIGHT UP DON'T GOT SPACE FOR A 'TIMER' IN THE GREEN BAR CAUSE OF OUR CURRENT GAME CONFIG, although I might use setText() to try to append 'Timer' + the Math.ceil()
        this.clockTimeLeft = this.add.text(borderUISize + borderPadding * 52, borderUISize + borderPadding * 4, this.clockTimeRemain, scoreConfig).setOrigin(0.5)

        this.game.settings.gameTimer = this.clockTimeLeft


        //For HS display config
        this.displayHSScore = this.HighScore

        let displayHSConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }
        this.displayHSdown = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2 + 120, 'YOUR HIGHSCORE IS: ' + this.displayHSScore, displayHSConfig).setOrigin(0.5)
            this.displayHSdown.alpha = 1
            this.gameOver = true
        }, null, this)

    }

    update() 
    {
        //Clock updating??
        this.clockTimeLeft.text = Math.ceil(this.clock.getRemainingSeconds())

        this.currentClockTime = Math.ceil(this.clock.getRemaining())

        //this.game.settings.gameTimer = this.currentClockTime

        if(this.currentClockTime >= 30000)
        {
            this.music.play()
        }

        //Penalty time?
        //this.PenaltyTime = Math.ceil(this.clock.getRemaining()) + -4000

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) 
        {
            this.scene.restart()
        }
        this.starfield.tilePositionX -= 4
        if(!this.gameOver) 
        {               
            this.p1Rocket.update()         // update rocket sprite
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
        } 

        // check collisions
        //NEW SHIP WHO DIS?!?!
        if(this.checkCollision(this.p1Rocket, this.ship04))
        {
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)
            this.clock.remove()
            this.clock = this.time.delayedCall(this.currentClockTime + 4000, () => {
                this.gameOver = true
            }, null, this)
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) 
        {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
            this.clock.remove()
            this.clock = this.time.delayedCall(this.currentClockTime + 1000, () => {
                this.gameOver = true
            }, null, this)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) 
        {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
            this.clock.remove()
            this.clock = this.time.delayedCall(this.currentClockTime + 2000, () => {
                this.gameOver = true;
            }, null, this)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) 
        {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            this.clock.remove()
            this.clock = this.time.delayedCall(this.currentClockTime + 3000, () => {
                this.gameOver = true
            }, null, this)
        }
        /*if(this.p1Rocket.y <= borderUISize * 3 + borderPadding)
        {
            this.p1Rocket.reset()
            this.checkClock(-8)
        }*/
        //this.checkRocketMiss(this.p1Rocket)
        /*if(this.p1Rocket.y <= borderUISize * 3 + borderPadding)
        {//This is what can make us subtract but we need a good condition...
            this.p1Rocket.reset()
            this.clock.remove()
            this.clock = this.time.delayedCall(this.currentClockTime - 16000, () => {
                this.gameOver = true
            }, null, this)
        }*/
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) 
        {
            this.scene.start("menuScene")
        }
        if(this.p1Rocket.isFiring == true)
        {
            console.log('Fire key F is pressed')
            this.FireCenter.alpha = 1
        }else{
            this.FireCenter.alpha = 0
        }
        if(this.gameOver && this.p1Score > this.HighScore)
        {
            this.HighScore = this.p1Score 
            this.HighScoreRight.setText('Highscore: '  + this.HighScore)
        }
        //display "YOUR HIGHSCORE IS: " at the end of the game, game over
        this.displayHSScore = this.p1Score
        this.displayHSdown.text = 'YOUR HIGHSCORE IS: ' + this.displayHSScore
        //For making the spaceship's speed INCREASE AFTER 30s
        this.currentTime = Math.ceil(this.clock.getRemaining())
        this.shipSpeed = this.game.settings.spaceshipSpeed
        this.fastShipSpeed = this.game.settings.fastSpeed
        if(this.currentTime <= 30000)
        {
            this.ship01.x -= this.shipSpeed
            this.ship02.x -= this.shipSpeed
            this.ship03.x -= this.shipSpeed
            this.ship04.x -= this.fastShipSpeed
        }
        //Stops music once game is OVER
        if(this.gameOver)
        {
            this.music.stop()
            this.menuMusic.stop()
        }
    
    }


    checkCollision(rocket, ship) 
    {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }

    shipExplode(ship) 
    {
        let RandomSounds = ['sfx-explosion', 'explosion2', 'explosion3', 'explosion4', 'explosion5']
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = 'Score:' + this.p1Score
        let randomSoundsPlay = Phaser.Utils.Array.GetRandom(RandomSounds)
        this.sound.play(randomSoundsPlay) 
    }

}