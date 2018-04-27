const config = {
    type: Phaser.AUTO, //this is the rendering context, auto tries to use WebGL fallback is canvas
    width: 800, //game resolution
    height: 600, //game resolution
    scene: {
        preload: preload,
        create: create,
        update, update
    }
};

const game = new Phaser.Game(config);

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
    this.add.image(0, 0, 'bomb').setOrigin(0, 0);
    this.add.image(200, 300, 'star').setOrigin(0, 0);
    //without setOrigin, image is half out of view!!!!
    // x and y coordinates of the image loaded
    //the game object is postioned center by default (dimensions: 800 x 600)
    //you can also use set origin to change this
}

function update(){

}
