class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }

    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON("room1","assets/maps2.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("deco", "assets/deco1.png");
    this.load.image("deco2", "assets/pipo.png");
    this.load.image("inside", "assets/inset.png");
    this.load.image("ground", "assets/tile.png");

    }

    create() {
    console.log('*** room1 scene');
    
    window.map = map;
    //Step 3 - Create the map from main
    var map = this.make.tilemap({key:'room1'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    var decoo = map.addTilesetImage("deco1","deco");
    var decoos = map.addTilesetImage("pipo","deco2");
    var groundss = map.addTilesetImage("tile", "ground");
    var inset = map.addTilesetImage("inset","inside")

    let tilesArray = [ groundss, inset, decoo, decoos ];

    // Step 5  Load in layers by layers
    this.ground3 = map.createLayer("ground3",tilesArray, 0, 0);
    this.walls = map.createLayer("wall",tilesArray, 0, 0);
    this.dero1 = map.createLayer("decora1",tilesArray, 0, 0);
    this.dero2 = map.createLayer("decora2",tilesArray, 0, 0);

     // load fire objects
     var start = map.findObject("objectLayer", (obj) => obj.name === "Start");

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

     // set the boundaries of our game world
     this.physics.world.bounds.width = this.ground3.width;
     this.physics.world.bounds.height = this.ground3.height;
 
     // Add main player here with physics.add.sprite
     // create the this.playersprite
     this.player = this.physics.add.sprite(start.x, start.y, "dashu");
     this.player.setScale(1).setSize(32, 32);
     this.player.setCollideWorldBounds(true); // don't go out of the this.map
 
     this.cursors = this.input.keyboard.createCursorKeys();
 
     // make the camera follow the player
     this.cameras.main.startFollow(this.player);
 
     //enable debug
     window.player = this.player;
     
    // set collide
    this.player.setCollideWorldBounds(true);
    // the this.player will collide with this layer
    this.walls.setCollisionByProperty({ ii: true });
    this.dero1.setCollisionByProperty({ pipipopo: true,ddddd: true });
    this.dero2.setCollisionByProperty({ pipipopo: true,ddddd: true });

    // this.playerwill collide with the level tiles
    this.physics.add.collider(this.walls, this.player);
    this.physics.add.collider(this.dero1, this.player);
    this.physics.add.collider(this.dero2, this.player);
    }

    update() {

    //Exit for room 1
    if (
      this.player.x > 256.49 &&
      this.player.x < 398 &&
      this.player.y > 618 )
      {
      this.world();
    }

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play("up", true);
      //console.log('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
      this.player.anims.play("down", true);
      //console.log('down');
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }

    }

// Function to jump to room1
world(player,title){
  console.log("world funtion");
  this.scene.start("world");
}  

} //////////// end of class world ////////////////////////


