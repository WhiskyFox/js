class intro2 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro2",
    });

    // Put global variable here
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
    this.load.image("cover", "assets/cover.png");
    this.load.image("intro", "assets/intro.png");
    this.load.image("intro2", "assets/intro2.png");




    //Character
    this.load.atlas('dashu','assets/maincharacter.png','assets/maincharacter.json');
    this.load.atlas('monster','assets/monster.png','assets/monster.json');
    this.load.atlas('bibi','assets/npc.png','assets/npc.json');
    this.load.atlas('bubu','assets/bomb.png','assets/bomb.json');

    //item
    this.load.atlas('item','assets/item.png','assets/item.json');
  }

  create() {
    console.log("*** intro2 scene");
    this.add.image(0, 0, 'intro2').setOrigin(0, 0).setScale(1);



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

  

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    //this.add.image(0, 0, 'main').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to intro3 scene");
        let playerPos = {};
        playerPos.x = 772;
        playerPos.y = 1240;
        playerPos.dir = "dashu";
        this.scene.start("intro3", { playerPos: playerPos });
      },
      this
    );




    // Create all the game animations here
  }
}
