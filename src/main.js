//Name: Leonardo Dulanto
//Title: Rocket Patrol Mod: WE be modding
//Project Hours: 10-12 hrs
//Type of Mods: 
/*
5 X 1 points: 5 points
Implement the 'FIRE' UI text from the original game (1), 
Track a high score that persists across scenes and display it in the UI (1),
Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
Implement the speed increase that happens after 30 seconds in the original game (1)
Allow the player to control the Rocket after it's fired (1)
2 X 3 points: 6 points
Display the time remaining (in seconds) on the screen (3)
Create 4 new explosion sound effects and randomize which one plays on impact (3)
2 X 5 points: 10 points
Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)

Total: 21 Points! I think....
*/
//Date: 2/1/24

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
