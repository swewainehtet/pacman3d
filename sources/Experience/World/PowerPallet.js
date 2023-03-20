import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";
import { powerPalletCoords } from "./Coords/PowerPalletCoords";

export default class PowerPallet {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.pacman = this.experience.world.pacman;
    this.scoreBoard = this.experience.world.scoreBoard;
    this.powerPalletArray = [];

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(Dim.POWERPALLET_RADIUS);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0x75e780,
      wireframe: false,
    });
  }

  setMesh() {
    this.count = powerPalletCoords.length;

    for (let i = 0; i < this.count; i++) {
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(
        powerPalletCoords[i].x + 0.5,
        powerPalletCoords[i].y + 0.5,
        0.5
      );
      this.scene.add(this.mesh);
      this.powerPalletArray.push(this.mesh);
    }
  }

  update() {
    for (let i = 0; i < this.count; i++) {
      if (
        this.pacman &&
        this.powerPalletArray &&
        this.pacman.mesh.position.x <
          this.powerPalletArray[i].position.x + 0.5 &&
        this.pacman.mesh.position.x >
          this.powerPalletArray[i].position.x - 0.5 &&
        this.pacman.mesh.position.y <
          this.powerPalletArray[i].position.y + 0.5 &&
        this.pacman.mesh.position.y > this.powerPalletArray[i].position.y - 0.5
      ) {
        this.scene.remove(this.powerPalletArray[i]);
        this.scoreBoard.items.add(
          powerPalletCoords[i].x.toString() +
            "," +
            powerPalletCoords[i].y.toString()
        );
      }
    }
  }
}
