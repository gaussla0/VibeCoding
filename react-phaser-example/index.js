(function() {
  const { useState, useEffect } = React;

  function GameComponent() {
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
      class DemoScene extends Phaser.Scene {
        constructor() {
          super('demo');
        }
        preload() {
          this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
          this.load.image('npc', 'https://labs.phaser.io/assets/sprites/baddie.png');
        }
        create() {
          this.player = this.physics.add.sprite(50, 100, 'player');
          this.npc = this.physics.add.staticSprite(200, 100, 'npc');

          this.cursors = this.input.keyboard.createCursorKeys();

          this.physics.add.overlap(this.player, this.npc, () => {
            setShowDialog(true);
          }, null, this);
        }
        update() {
          const speed = 150;
          this.player.setVelocity(0);
          if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
          } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
          }
          if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
          } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
          }
        }
      }

      const config = {
        type: Phaser.AUTO,
        width: 400,
        height: 300,
        parent: 'gameContainer',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false
          }
        },
        scene: DemoScene
      };

      const game = new Phaser.Game(config);
      return () => game.destroy(true);
    }, []);

    return (
      React.createElement(React.Fragment, null,
        React.createElement('div', { id: 'gameContainer' }),
        showDialog && React.createElement('div', { className: 'dialog' }, 'Hello NPC!')
      )
    );
  }

  ReactDOM.render(React.createElement(GameComponent), document.getElementById('root'));
})();
