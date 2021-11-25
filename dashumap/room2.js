class room2 extends Phaser.Scene {

    constructor() {
        super({ key: 'room2' });
        
        // Put global variable here
    }

    init(data) {
        this.playerPos = data.playerPos
        this.inventory = data.inventory
    }

    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON("room2","assets/maps3.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("deco", "assets/deco1.png");
    this.load.image("deco2", "assets/pipo.png");
    this.load.image("inside", "assets/inset.png");
    this.load.image("ground", "assets/tile.png");

     //item
     this.load.atlas('item','assets/item.png','assets/item.json');

    }

    create() {
    console.log('*** room2 scene');
    
    window.map = map;
    //Step 3 - Create the map from main
    var map = this.make.tilemap({key:'room2'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    var decoo = map.addTilesetImage("deco1","deco");
    var decoos = map.addTilesetImage("pipo","deco2");
    var groundss = map.addTilesetImage("tile", "ground");
    var inset = map.addTilesetImage("inset","inside")
    var titi = map.addTilesetImage("item","item");

    let tilesArray = [ groundss, inset, decoo, decoos ];

    // Step 5  Load in layers by layers
    this.ground5 = map.createLayer("ground4",tilesArray, 0, 0);
    this.wallss = map.createLayer("wall2",tilesArray, 0, 0);
    this.dero11 = map.createLayer("dero",tilesArray, 0, 0);
    this.dero22 = map.createLayer("dero2",tilesArray, 0, 0);
    this.itemcollect = map.createLayer("itemcollect",titi,0,0);

     // load fire objects
    // var start = map.findObject("objectLayer2", (obj) => obj.name === "Start");

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

     // set the boundaries of our game world
     this.physics.world.bounds.width = this.ground5.width;
     this.physics.world.bounds.height = this.ground5.height;
 
     // Add main player here with physics.add.sprite
     // create the this.playersprite
    //  this.player = this.physics.add.sprite(start.x, start.y, "dashu");
     this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      this.playerPos.dir
    );

     this.player.setScale(1).setSize(32, 32);
     this.player.setCollideWorldBounds(true); // don't go out of the this.map
 
     this.cursors = this.input.keyboard.createCursorKeys();

    // get the tileIndex number in json, +1
    this.itemcollect.setTileIndexCallback(1643, this.removeItem, this);
 
     // make the camera follow the player
     this.cameras.main.startFollow(this.player);
 
     //enable debug
     window.player = this.player;


    //npc movement
    this.enemy1 = this.physics.add.sprite(545.40, 161.34, "enemy1").play("dudu");
    this.enemy2 = this.physics.add.sprite(60.60, 509.20, "enemy1").play("dede");


    this.time.addEvent({
      delay: 1000,
      callback: this.moveLeftRight,
      callbackScope: this,
      loop: false,
    });
    this.time.addEvent({
      delay: 1000,
      callback: this.moveLeftRight2,
      callbackScope: this,
      loop: false,
    });

    //npc overlape
    this.physics.add.overlap(this.player, this.enemy1,this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.enemy2,this.enemyOverlap, null, this);

     
    // set collide
    this.player.setCollideWorldBounds(true);
    // the this.player will collide with this layer
    this.wallss.setCollisionByProperty({ ii: true });
    this.dero11.setCollisionByProperty({ pipipopo: true,ddddd: true });
    this.dero22.setCollisionByProperty({ pipipopo: true,ddddd: true });

    // this.playerwill collide with the level tiles
    this.physics.add.collider(this.wallss, this.player);
    this.physics.add.collider(this.dero11, this.player);
    this.physics.add.collider(this.dero22, this.player);

    // What will collider witg what layers
    this.physics.add.collider(this.itemcollect, this.player);


    }

    moveLeftRight() {
      console.log("moveLeftRight");
      this.tweens.timeline({
        targets: this.enemy1,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 2000,
        tweens: [
          {
            x: 73.98,
          },
          {
            x: 545.40,
          },
        ],
      });
    }

    moveLeftRight2() {
      console.log("moveLeftRight2");
      this.tweens.timeline({
        targets: this.enemy2,
        ease: "Linear",
        loop: -1, // loop forever
        duration: 2000,
        tweens: [
          {
            x: 587.11,
          },
          {
            x: 60.60,
          },
        ],
      });
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
world(player, tile) {
  console.log("world function");
  let playerPos = {};
  playerPos.x = 926.67;
  playerPos.y = 189.33;
  playerPos.dir = "left";
  this.scene.start("world", { playerPos: playerPos });
}

enemyOverlap(){
  console.log(" enemy overlap player");
  this.scene.start("over");
}

removeItem(player, tile) {
  console.log("remove item", tile.index);
  this.itemcollect.removeTileAt(tile.x, tile.y); // remove the item
  return false;
}

} //////////// end of class world ////////////////////////


