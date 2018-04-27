const config = {
    type: Phaser.AUTO, //this is the rendering context, auto tries to use WebGL fallback is canvas
    width: 800, //game resolution
    height: 600,//game resolution
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }, 
    scene: {
        preload: preload,
        create: create,
        update, update
    }
};

const game = new Phaser.Game(config);
let platforms;

function preload(){
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude', 
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}
function create(){
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup(); 
    //call to Arcade Physics System...must add to game config
    //applies a STATIC physics group to the variable platforms...these are STATIC bodies VS DYNAMIC
    //A Physics Group will automatically create physics enabled children, saving you some leg-work in the process.
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    //without setOrigin, image is half out of view!!!!
    // x and y coordinates of the image loaded
    //the game object is postioned center by default (dimensions: 800 x 600)
    //you can also use set origin to change this
    //images displayed in order that they are preloaded!!!
}

function update(){

}
