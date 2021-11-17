class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }


  // incoming data from scene below
  init(data) {
  }

  preload() {

    
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world","assets/maps.json");


    // Step 2 : Preload any images here, nickname, filename
    this.load.image("house", "assets/hosue.png");
    this.load.image("roots", "assets/root.png");
    this.load.image("deco", "assets/deco1.png");
    this.load.image("plant1", "assets/mushroom.png");
    this.load.image("ground", "assets/tile.png");
    this.load.image("deco2", "assets/pipo.png");
    this.load.image("plant2", "assets/tree.png");

    //Character
    this.load.atlas('dashu','assets/maincharacter.png','assets/maincharacter.json');
    this.load.atlas('monster','assets/monster.png','assets/monster.json');
    this.load.atlas('bibi','assets/npc.png','assets/npc.json');
    this.load.atlas('bubu','assets/bomb.png','assets/bomb.json');

  }

  create() {
    console.log("*** world scene");

    window.map = map;
    //Step 3 - Create the map from main
    var map = this.make.tilemap({key:'world'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    var groundss = map.addTilesetImage("tileset", "ground");
    var house1 = map.addTilesetImage("houses","house");
    var house2 = map.addTilesetImage("root","roots");
    var plant3 = map.addTilesetImage("mushroom","plant1");
    var plants4 = map.addTilesetImage("tree","plant2");
    var decoo = map.addTilesetImage("deco1","deco");
    var decoos = map.addTilesetImage("pipo","deco2");

    let tilesArray = [ groundss,house1, house2, plant3, plants4, decoo, decoos ];

    // Step 5  Load in layers by layers
    this.ground2 = map.createLayer("ground",tilesArray, 0, 0);
    this.building2 = map.createLayer("building", tilesArray,0,0);
    this.street2 = map.createLayer("decoration",tilesArray,0,0);

     // load fire objects
     var start = map.findObject("objectLayer", (obj) => obj.name === "Start");
     var fire1 = map.findObject("objectLayer", (obj) => obj.name ==="fire1");
     var simi1 = map.findObject("objectLayer", (obj) => obj.name ==="simi1");
     var simi2 = map.findObject("objectLayer", (obj) => obj.name ==="simi2");




    this.anims.create({
      key: "up",
      frames:[
        {key:'dashu', frame: 'b1.png'},
        {key:'dashu', frame: 'b2.png'},
        {key:'dashu', frame: 'b3.png'}, 
    ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames:[
        {key:'dashu', frame:'l1.png'},
        {key:'dashu', frame:'l2.png'},
        {key:'dashu', frame:'l3.png'},
    ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames:[
        {key:'dashu', frame: 'f1.png'},
        {key:'dashu', frame: 'f2.png'},
        {key:'dashu', frame: 'f3.png'}, 
    ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames:[
        {key:'dashu', frame: 'r1.png'},
        {key:'dashu', frame: 'r2.png'},
        {key:'dashu', frame: 'r3.png'}, 
    ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key:'hihi',
      frames:[
          {key:'bubu', frame:'bomb1.png'},
          {key:'bubu', frame:'bomb2.png'},
          {key:'bubu', frame:'bomb3.png'},
          {key:'bubu', frame:'bomb4.png'},
          {key:'bubu', frame:'bomb5.png'},

      ],
      frameRate:10,
      repeat:-1,
  })

  this.anims.create({
    key:'lala',
    frames:[
        {key:'monster', frame:'left1.png'},
        {key:'monster', frame:'left2.png'},
        {key:'monster', frame:'middle.png'},
        {key:'monster', frame:'right1.png'},
        {key:'monster', frame:'right2.png'},

    ],
    frameRate:10,
    repeat:-1,
  })

  this.anims.create({
    key:'dudu',
    frames:[
        {key:'bibi', frame:'back.png'},
        {key:'bibi', frame:'front.png'},
        {key:'bibi', frame:'left1.png'},
        {key:'bibi', frame:'left2.png'},
        {key:'bibi', frame:'left3.png'},
        {key:'bibi', frame:'right1.png'},
        {key:'bibi', frame:'right2.png'},
        {key:'bibi', frame:'right3.png'},
    ],
    frameRate:10,
    repeat:-1,
})

    this.enemy1 = this.physics.add.sprite (fire1.x, fire1.y, 'fire1').play('hihi');
    this.enemy2 = this.physics.add.sprite (simi1.x, simi1.y, 'simi1').play('lala');
    this.enemy3 = this.physics.add.sprite (simi2.x, simi2.y, 'simi1').play('dudu');



    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.delayOneSec,
      callbackScope: this,
      loop: false,
    });

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.ground2.width;
    this.physics.world.bounds.height = this.ground2.height;

    // Add main player here with physics.add.sprite
    // create the this.playersprite
    this.player = this.physics.add.sprite(start.x, start.y, "dashu");
    this.player.setScale(1.2).setSize(32, 32);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    //enable debug
    window.player = this.player;
    this.player.setCollideWorldBounds(true);

    // the this.player will collide with this layer
    this.building2.setCollisionByProperty({ ddd: true });
    this.street2.setCollisionByProperty({ MUSHROOM: true, PIPI: true, TRREE: true, });

    // this.playerwill collide with the level tiles
    this.physics.add.collider(this.building2, this.player);
    this.physics.add.collider(this.street2, this.player);

     // set bounds so the camera won't go outside the game world
     this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);
  
   
   
  } /////////////////// end of create //////////////////////////////


  update(time, delta) {

    //check for room 1
    if (
      this.player.x > 159 &&
      this.player.x < 319 &&
      this.player.y > 959 &&
      this.player.y < 1025
    ) {
      this.room1();
    }
    if (
      this.player.x > 93 &&
      this.player.x < 221 &&
      this.player.y > 601 &&
      this.player.y < 645
    ) {
      this.room1();
    }
    if (
      this.player.x > 152 &&
      this.player.x < 291 &&
      this.player.y > 196 &&
      this.player.y < 258
    ) {
      this.room1();
    }
    if (
      this.player.x > 1079 &&
      this.player.x < 1220 &&
      this.player.y > 606 &&
      this.player.y < 640
    ) {
      this.room1();
    }
    //room2
    if (
      this.player.x > 1056 &&
      this.player.x < 1147 &&
      this.player.y > 198 &&
      this.player.y < 272
    ) {
      this.room2();
    }

    // this.fireGroup.children.iterate((fire) => {
    //   this.physics.moveToObject(fire, this.player, 30, 3000);
    // });

    // this.fireGroup2.children.iterate((fire) => {
    //   this.physics.moveToObject(fire, this.player, 30, 3000);
    // });

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); // walk left
      this.player.flipX = false; // flip the sprite to the left
      //console.log('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("left", true);
      this.player.flipX = true; // use the original sprite looking to the right
      //console.log('right');
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
      //console.log('idle');
    }
    
  } // end of update()

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1");
  }
  room2(player, tile) {
    console.log("room2 function");
    this.scene.start("room2");
  }
} //////////// end of class world ////////////////////////
