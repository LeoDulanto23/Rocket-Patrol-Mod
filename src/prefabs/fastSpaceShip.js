class fastSpaceShip extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.superSpeed = game.settings.fastSpeed
    }

    update()
    {
        //move fastspaceship left...hopefully
        this.x -= this.superSpeed
        //wraparound, but we want the small fast ship to wrap on black screen
        //I swear I'm not crazy I know that we need to slightly modify this area in order for the new ship 
        //to go into the black screen and not the entire white border screen.....
        //Nah I was wrong apparently tried to use a colored spaceship but turns out I needed a W H I T E ship instead....
        if(this.x <= 0 - this.width)
        {
            this.x = game.config.width 
            //this.reset() 
        }
    }

    //reset positon
    reset()
    {
        this.x = game.config.width 
    }
}