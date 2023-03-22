import Experience from "./Experience";
import { palletCoords } from "./World/Coords/PalletCoords";
import { powerPalletCoords } from "./World/Coords/PowerPalletCoords";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as THREE from "three";
import { Text } from "troika-three-text";

export default class Scoreboard {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.items = new Set();
    this.score = 0;
    this.scene = this.experience.scene;

    this.setMesh();
  }

  setMesh() {
    this.scoreText = new Text();
    this.scoreText.text = "/244";
    this.scoreText.anchorX = "100%";
    this.scoreText.fontSize = 2;
    this.scoreText.position.x = 28;
    this.scoreText.position.y = 38;
    this.scoreText.color = 0x2266ff;
    this.scene.add(this.scoreText);
  }

  update() {
    // Update score text
    this.scoreText.text = this.items.size + "/244";
    this.scoreText.sync();

    if (this.items.size == palletCoords.length + powerPalletCoords.length)
      this.experience.world.displayWinScreen();
  }
}
