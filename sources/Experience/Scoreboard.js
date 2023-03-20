import Experience from "./Experience";
import { palletCoords } from "./World/Coords/PalletCoords";
import { powerPalletCoords } from "./World/Coords/PowerPalletCoords";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as THREE from "three";

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
    console.log(this.experience.resources.items.defaultFont);
    this.geometry = new TextGeometry("0/244", {
      font: this.experience.resources.items.defaultFont,
      size: 2,
      height: 0.1,
    });

    this.material = new THREE.ShaderMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 37, 0);
    this.scene.add(this.mesh);
  }

  update() {
    if (this.items.size == palletCoords.length + powerPalletCoords.length)
      console.log("win");
  }
}
