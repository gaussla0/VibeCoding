# React Phaser Example

This repository contains a small example combining React and Phaser.js. The player can move with the arrow keys and interacting with an NPC opens a simple dialog box.

## Running the example

Simply open `react-phaser-example/index.html` in a browser with internet access. The page loads React, ReactDOM, and Phaser from CDNs.

The game will appear in the top of the page. Use the arrow keys to move the player toward the NPC sprite. When the two overlap, the client calls the Gemini API and displays its response in a dialog. The included source already contains a Gemini API key for quick testing.

Edit `react-phaser-example/index.js` to change the prompt text or replace the API key if needed.

The code for the example resides in `react-phaser-example/index.js`.
