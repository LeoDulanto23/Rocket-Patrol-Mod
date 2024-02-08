class Spaceship extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed
        //this.superSpeed = game.settings.fastSpeed

    }

    update()
    {
        //move spaceship left
        this.x -= this.moveSpeed
        //TRYING TO MOVE FASTSPACESHIPSPEED MORE??
        //this.x -= this.superSpeed
        //wrap from left to right edge
        if(this.x <= 0 - this.width)
        {
            this.x = game.config.width
        }
    }

    //reset positon
    reset()
    {
        this.x = game.config.width
    }
}