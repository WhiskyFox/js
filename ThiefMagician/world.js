class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }


  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos
    this.inventory = data.inventory
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

    //item
    this.load.atlas('item','assets/item.png','assets/item.json');

    //Icon
    this.load.image("icon1", "assets/lemon.png");
    this.load.image("icon2", "assets/roller.png");
    this.load.image("icon3", "assets/weapon.png");

    //audio
    this.load.audio("Is","assets/cs.wav");
    this.load.audio("Ds","assets/die.wav");

  }

  create() {

    
    console.log("*** world scene");

    

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
    var titi = map.addTilesetImage("item","item");

    let tilesArray = [ groundss,house1, house2, plant3, plants4, decoo, decoos ];


    // Step 5  Load in layers by layers
    this.ground2 = map.createLayer("ground",tilesArray, 0, 0);
    this.building2 = map.createLayer("building", tilesArray,0,0);
    this.street2 = map.createLayer("decoration",tilesArray,0,0);
    this.itemcollect = map.createLayer("itemcollect",titi,0,0); 

     // load fire objects
     var start = map.findObject("objectLayer", (obj) => obj.name === "Start");
     var fire1 = map.findObject("objectLayer", (obj) => obj.name ==="fire1");
     var simi1 = map.findObject("objectLayer", (obj) => obj.name ==="simi1");
     var simi2 = map.findObject("objectLayer", (obj) => obj.name ==="simi2");

    this.sound1 = this.sound.add('Is');
    this.sound2 = this.sound.add('Bs');
    this.sound3 = this.sound.add('Ds');



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
        // {key:'bibi', frame:'back.png'},
        // {key:'bibi', frame:'front.png'},
        {key:'bibi', frame:'left1.png'},
        {key:'bibi', frame:'left2.png'},
        {key:'bibi', frame:'left3.png'},
        // {key:'bibi', frame:'right1.png'},
        // {key:'bibi', frame:'right2.png'},
        // {key:'bibi', frame:'right3.png'},
    ],
    frameRate:10,
    repeat:-1,
})

this.anims.create({
  key:'dede',
  frames:[
      // {key:'bibi', frame:'back.png'},
      // {key:'bibi', frame:'front.png'},
      // {key:'bibi', frame:'left1.png'},
      // {key:'bibi', frame:'left2.png'},
      // {key:'bibi', frame:'left3.png'},
      {key:'bibi', frame:'right1.png'},
      {key:'bibi', frame:'right2.png'},
      {key:'bibi', frame:'right3.png'},
  ],
  frameRate:10,
  repeat:-1,
})

    // this.fire1 = this.physics.add.sprite (fire1.x, fire1.y, 'fire1').play('hihi');
    // this.simi1 = this.physics.add.sprite (simi1.x, simi1.y, 'simi1').play('lala');
    // this.simi2 = this.physics.add.sprite (simi2.x, simi2.y, 'simi2').play('dudu');
  
    
    

    //npc movement
    this.simi1 = this.physics.add.sprite(333.33, 1073.33,"simi1").play("lala");
    this.simi2 = this.physics.add.sprite(237, 696,"simi1").play("lala");
    this.simi3 = this.physics.add.sprite(509.33, 400,"simi1").play("lala");
    this.simi4 = this.physics.add.sprite(1069.33, 302.67,"simi1").play("lala");
    this.fire = this.physics.add.sprite(1006.67, 685.33,"fire").play("hihi");
    this.fire2 = this.physics.add.sprite(974.67, 402.67,"fire").play("hihi");
    this.fire3 = this.physics.add.sprite(112, 305.33,"fire").play("hihi");

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.ground2.width;
    this.physics.world.bounds.height = this.ground2.height;

    // Add main player here with physics.add.sprite
    // create the this.playersprite
    // this.player = this.physics.add.sprite(start.x, start.y, "dashu");
    this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      this.playerPos.dir);
      window.player = this.player;
    this.player.setScale(1).setSize(32, 32);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    //icon on left up
    this.icon1 = this.physics.add.sprite 
    (50,50,"icon1")
    .setScrollFactor(0)
    .setVisible(false);

    this.icon2 = this.physics.add.sprite 
    (100,50,"icon2")
    .setScrollFactor(0)
    .setVisible(false);

    this.icon3 = this.physics.add.sprite 
    (150,50,"icon3")
    .setScrollFactor(0)
    .setVisible(false);

    // get the tileIndex number in json, +1
    this.itemcollect.setTileIndexCallback(3042, this.removeItem3, this);
    

    // //npc border
    // this.physics.add.collider(this.player,this.simi1);
    // this.physics.add.collider(this.street2, this.simi1);
    // this.physics.add.collider(this.building2, this.simi1);

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

    this.time.addEvent({
    delay: 1000,
    callback: this.moveSquare,
    callbackScope: this,
    loop: false,
  });

  this.time.addEvent({
    delay: 0,
    callback: this.moveDownUp,
    callbackScope: this,
    loop: false,
  });

  this.time.addEvent({
    delay: 0,
    callback: this.moveDownUp2,
    callbackScope: this,
    loop: false,
  });

  this.time.addEvent({
    delay: 1000,
    callback: this.moveLeftRight3,
    callbackScope: this,
    loop: false,
  });

  this.time.addEvent({
    delay: 1000,
    callback: this.moveLeftRight4,
    callbackScope: this,
    loop: false,
  });

    //npc overlape
    this.physics.add.overlap(this.player, this.simi1,this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.simi2,this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.simi3,this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.fire,this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.fire2,this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.fire3,this.enemyOverlap, null, this);
    this.physics.add.overlap(this.player, this.simi4,this.enemyOverlap, null, this);



    //keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
    //enable debug
    this.player.setCollideWorldBounds(true);
    // the this.player will collide with this layer
    this.building2.setCollisionByProperty({ ddd: true });
    this.street2.setCollisionByProperty({ MUSHROOM: true, PIPI: true, TRREE: true, });

    // this.playerwill collide with the level tiles
    this.physics.add.collider(this.building2, this.player);
    this.physics.add.collider(this.street2, this.player);
     // set bounds so the camera won't go outside the game world
     this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

     // What will collider witg what layers
    this.physics.add.collider(this.itemcollect, this.player);


    if (window.icon === 3) {
      this.icon1.setVisible(true);
      this.icon2.setVisible(true);
      this.icon3.setVisible(true);
      } else if (window.icon === 2) {
      this.icon1.setVisible(true);
      this.icon3.setVisible(true);
      } else if (window.icon === 1) {
      this.icon1.setVisible(true);
      } 
   
  } /////////////////// end of create //////////////////////////////

  //npc function
   moveLeftRight() {
    console.log("moveLeftRight");
    this.tweens.timeline({
      targets: this.simi1,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          x: 142.67,
        },
        {
          x: 333.33,
        },
      ],
    });
  }

  moveLeftRight2() {
    console.log("moveLeftRight2");
    this.tweens.timeline({
      targets: this.simi2,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          x: 50,
        },
        {
          x: 237,
        },
      ],
    });
  }

  moveSquare() {
    console.log("moveSquare");
    this.tweens.timeline({
      targets: this.simi3,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 800,
  
      tweens: [
        {
          y: 698.67,
        },
        {
          x: 830.67,
        },
        
        {
          y: 400,
        },
        {
          x: 509.33,
        },
      ],
    });
  }

  moveDownUp() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.fire,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 1500,
      tweens: [
        {
          y: 782.67,
        },
        {
          y: 685.33,
        },
      ],
    });
  }

  moveDownUp2() {
    console.log("moveDownUp2");
    this.tweens.timeline({
      targets: this.fire2,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 1500,
      tweens: [
        {
          y: 298.67,
        },
        {
          y: 402.67,
        },
      ],
    });
  }
  moveLeftRight3() {
    console.log("moveLeftRight3");
    this.tweens.timeline({
      targets: this.simi4,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          x: 1168,
        },
        {
          x: 1069.33,
        },
      ],
    });
  }
  moveLeftRight4() {
    console.log("moveLeftRight4");
    this.tweens.timeline({
      targets: this.fire3,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          x: 368,
        },
        {
          x: 112,
        },
      ],
    });
  }

  update(time, delta) {

    if ( this.player.x > 721
      && this. player.x< 874
      && this. player.y< 71.67 && window.icon >=3){
      
      this.winLiao();
      } 



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
    let playerPos = {};
    playerPos.x = 333.73;
    playerPos.y = 590.45;
    playerPos.dir = "up";
    this.scene.start("room1",{ playerPos: playerPos });
  }
  room2(player, tile) {
    console.log("room2 function");
    let playerPos = {};
    playerPos.x = 319.53;
    playerPos.y = 587.90;
    playerPos.dir = "up";
    this.scene.start("room2",{ playerPos: playerPos});
  }

  removeItem1(player, tile) {
    this.sound1.play();

    // this.itemcollect++;
    console.log("remove item1", tile.index);
    this.itemcollect.removeTileAt(tile.x, tile.y);
    this.icon1.setVisible(true); 
    window.icon++;
    return false;
  }
  removeItem2(player, tile) {
    this.sound1.play();

    // this.itemcollect++;
    console.log("remove item2", tile.index);
    this.itemcollect.removeTileAt(tile.x, tile.y);
    this.icon2.setVisible(true); 
    window.icon++;
    return false;
  }
  removeItem3(player, tile) {
    this.sound1.play();

    // this.itemcollect++;
    console.log("remove item3", tile.index);
    this.itemcollect.removeTileAt(tile.x, tile.y);
    this.icon3.setVisible(true); 
    window.icon++;
    return false;
  }

  enemyOverlap(){
    this.sound3.play();

    console.log(" enemy overlap player");
    // this.cameras.main.shake(200);
    this.scene.start("over");
  }

  winLiao(){
    console.log(" player win");
    this.scene.start("win");
  }

} //////////// end of class world ////////////////////////




