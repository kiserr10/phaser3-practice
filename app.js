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
let stars;
let player;
let cursors;

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
    cursors = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup(); 
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    //call to Arcade Physics System...must add to game config
    //applies a STATIC physics group to the variable platforms...these are STATIC bodies VS DYNAMIC
    //A Physics Group will automatically create physics enabled children, saving you some leg-work in the process.
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    //The call to refreshBody() is required because we have scaled a static physics body, so we have to tell the physics world about the changes we made.
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    //without setOrigin, image is half out of view!!!!
    // x and y coordinates of the image loaded
    //the game object is postioned center by default (dimensions: 800 x 600)
    //you can also use set origin to change this
    //images displayed in order that they are preloaded!!!
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);

    this.physics.add.collider(player, platforms); //collide detection between the two Game Objects passed in!
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
}

function update(){
    if(cursors.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if(cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true); 
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if(cursors.space.isDown && player.body.touching.down){ 
        //checks to see if the player is touching the ground/floor 
        //player shouldnt be able to jump from mid air
        player.setVelocityY(-500);
    }
}

function collectStar(player, star){
    star.disableBody(true, true);
}