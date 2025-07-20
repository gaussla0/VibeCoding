(function() {
  const { useState, useEffect } = React;

  function GameComponent() {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogText, setDialogText] = useState('');

    const API_KEY = 'AIzaSyCpgL2OaqMCIfPQF0xxRyNZQ20pWiWQuQ4';

    async function fetchGeminiResponse() {
      setDialogText('Loading...');
      setShowDialog(true);
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { parts: [{ text: 'Say hello to the player in a friendly way.' }] },
              ],
            }),
          }
        );
        const data = await response.json();
        const text =
          data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
        setDialogText(text);
      } catch (e) {
        setDialogText('Error fetching response');
      }
    }

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

          this.physics.add.overlap(
            this.player,
            this.npc,
            () => {
              fetchGeminiResponse();
            },
            null,
            this
          );
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
        showDialog && React.createElement('div', { className: 'dialog' }, dialogText)
      )
    );
  }

  ReactDOM.render(React.createElement(GameComponent), document.getElementById('root'));
})();
