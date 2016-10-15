//Global variables
var zidane, delpiero, buffon, gattuso, marco;
var stateText, gameText;
var bng = 3,
    ispeed = 180,
    bvelocity = 750,
    gravityy = 1000;

var game = new Phaser.Game(600, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {

    game.load.image('ground', 'assets/ground.png');
    game.load.image('background', 'assets/background.png');
    game.load.spritesheet('zidane', 'assets/sprites/runner.png', 106, 140, 16);
    game.load.image('delpiero', 'assets/sprites/delpiero.png');
    game.load.image('buffon', 'assets/sprites/buffon.png');
    game.load.image('gattuso', 'assets/sprites/gattuso.png');
    game.load.image('marco', 'assets/sprites/marco.png');
    cursors = game.input.keyboard.createCursorKeys();
}

function create() {

    //    game.physics.startSystem(Phaser.Physics.ARCADE);
    //    game.physics.arcade.gravity.y = 1000;
    game.physics.startSystem(Phaser.Physics.NINJA);
    //Add button
    headButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //  The background and ground
    background = game.add.tileSprite(0, 0, 800, 600, 'background');
    ground = game.add.tileSprite(0, 500, 800, 100, 'ground');

    //  The Zidane
    zidane = game.add.sprite(200, 300, 'zidane');
    game.physics.enable([zidane], Phaser.Physics.ARCADE);
    zidane.body.collideWorldBounds = true;
    zidane.body.bounce.y = 0;
    zidane.body.gravity.y = gravityy;
    //    zidane.body.setSize(75, 120, 20, 0);

    //  Animations, move and headbutt.
    zidane.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
    zidane.animations.add('headbutt', [8, 9, 10, 11, 12, 13, 14, 15], 7, true);

    //Del Piero
    createDelpiero();
    createBuffon();
    createGattuso();
    createMarco();

    //Restart Text
    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
        font: '35px Arial',
        fill: 'black'
    });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    gameText = game.add.text(300, 50, '', {
        font: '35px Arial',
        fill: '#fff'
    });
    gameText.anchor.setTo(0.5, 0.5);
    gameText.visible = true;

    //Timer
    game.time.events.loop(Phaser.Timer.SECOND * 4, upSpeed, this);
}

function createDelpiero() {
    delpiero = game.add.sprite(700, 460, 'delpiero');
    game.physics.enable(delpiero, Phaser.Physics.ARCADE);
//    game.physics.ninja.enableTile(delpiero, delpiero.frame);
}

function createBuffon() {
    buffon = game.add.sprite(1600, 460, 'buffon');
    game.physics.enable(buffon, Phaser.Physics.ARCADE);
}

function createGattuso() {
    gattuso = game.add.sprite(3000, 460, 'gattuso');
    game.physics.enable(gattuso, Phaser.Physics.ARCADE);
}

function createMarco() {
    marco = game.add.sprite(5000, 460, 'marco');
    game.physics.enable(marco, Phaser.Physics.ARCADE);
}

function resetSpeed() {
    bng = 3;
    ispeed = 180;
    gravityy = 1000;
    bvelocity = 750;
}

function upSpeed() {
    bng += 1;
    ispeed += 60;
    gravityy += 100;
    if (bng >= 7) {
        bvelocity = 0;
    } else {
        bvelocity -= 50;
    }
}

function update() {
    startGame();
}

function startGame() {

    if (headButton.isDown) {
        if (zidane.body.onFloor()) {
            zidane.body.velocity.y = -bvelocity;
        }
        zidane.animations.play('headbutt');
    } else if (zidane.body.onFloor()) {

        zidane.animations.play('move');
    }

    gameText.text = "Tap 'Space' to Jump and Headbutt!\nAvoid Others and Take Out Marco";

    //    game.debug.text("Time: " + game.time.events.duration, 10, 10);

    //  Scroll the background and ground and italians
    background.tilePosition.x += -bng;
    ground.tilePosition.x += -bng;
    delpiero.body.velocity.x = -ispeed;
    buffon.body.velocity.x = -ispeed;
    gattuso.body.velocity.x = -ispeed;
    marco.body.velocity.x = -ispeed;

    //  Collide zidane with the italians
    game.physics.arcade.overlap(delpiero, zidane, zidaneCollidesDelpiero, null, this);
    game.physics.arcade.overlap(buffon, zidane, zidaneCollidesBuffon, null, this);
    game.physics.arcade.overlap(gattuso, zidane, zidaneCollidesGattuso, null, this);
    game.physics.arcade.overlap(marco, zidane, zidaneCollidesMarco, null, this);
}

function zidaneCollidesDelpiero(delpiero, zidane) {

    //  when a zidane hits delpiero, kill all
    delpiero.kill();
    zidane.kill();
    buffon.kill();
    gattuso.kill();
    marco.kill();

    // show restart text
    stateText.text = "Oops! You got Del Piero,\nClick to restart!";
    stateText.visible = true;

    // the "click to restart" handler
    game.input.onTap.addOnce(restart, this);

}

function zidaneCollidesBuffon() {

    //  when a zidane hits delpiero, kill all
    buffon.kill();
    zidane.kill();
    delpiero.kill();
    gattuso.kill();
    marco.kill();

    // show restart text
    stateText.text = "Oops! You got Buffon,\nClick to restart!";
    stateText.visible = true;

    // the "click to restart" handler
    game.input.onTap.addOnce(restart, this);
}

function zidaneCollidesGattuso() {

    //  when a zidane hits delpiero, kill all
    gattuso.kill();
    zidane.kill();
    buffon.kill();
    delpiero.kill();
    marco.kill();

    // show restart text
    stateText.text = "Oops! You got Gattuso,\nClick to restart!";
    stateText.visible = true;

    // the "click to restart" handler
    game.input.onTap.addOnce(restart, this);
}

function zidaneCollidesMarco() {

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        
        //    marco.kill();
        //    zidane.kill();
        //  when a zidane headbutts delpiero, marco falls, kill all others
        marco.angle = 70;
        buffon.kill();
        delpiero.kill();
        gattuso.kill();
        
        // show restart text
        stateText.text = "Congrats!\nYou got Marco burning back to Italy!\nClick to restart!";
        stateText.visible = true;  
    } 
    else if (!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        
        //        marco.angle = 70;
        //        zidane.angle = 70;
        //        marco.kill();
        //  when a zidane got hit by delpiero, marco stays put, kill zidane and others
        zidane.kill();
        buffon.kill();
        delpiero.kill();
        gattuso.kill();
        
        // show restart text
        stateText.text = "Headbutt Him!\nClick to restart!";
        stateText.visible = true;
    }
    
    //call reset speed function
    resetSpeed();

    // the "click to restart" handler
    game.input.onTap.addOnce(restart, this);
}

function restart() {

    //create italians
    createDelpiero();
    createBuffon();
    createGattuso();
    createMarco();

    //revives zidane
    zidane.revive();

    //reset time
    resetSpeed();

    //hides the text
    stateText.visible = false;

    //reposition background and ground
    background.tilePosition.x = 0;
    ground.tilePosition.x = 0;

}