var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [main,intro,intro2,intro3,over, world, room1, room2,]
};

var game = new Phaser.Game(config);