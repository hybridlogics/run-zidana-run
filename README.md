# RunZidanaRun #
A phaser based game inspired by the true events of 2006 World Cup Final. Featureing Zinedine Zidane, Del Piero, Pirlo, Buffon and Marco Materazzi


## INSTRUCTIONS: ##

Use npm package "live-server" or any alternative local server to run this game.


## KEYS: ##

    Press 'SPACE':                            JUMP / HEADBUTT
    Press 'Left Mouse Button':                To start stage


## TECHNOLOGIES: ##

- HTML 5 Phaser
- jQuery


## CODE SNIPPETS: ##

1- Start Game:-

    :::javascript
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


![alt tag](https://cloud.githubusercontent.com/assets/21244627/19411137/d4375744-9314-11e6-829a-2426f7a1afc2.png)