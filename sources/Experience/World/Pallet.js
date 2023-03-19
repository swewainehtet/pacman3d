import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";
import { palletCoords } from "./Coords/PalletCoords";
import * as CANNON from "cannon-es";
import { wallCoords } from "./Coords/WallCoords";

export default class PowerPallet {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.physics = this.experience.world.physics;
    this.pacman = this.experience.world.pacman;
    this.palletArray = [];

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setPhysics();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(Dim.PALLET_RADIUS);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0xf8e473,
    });
  }

  setMesh() {
    this.count = palletCoords.length;

    for (let i = 0; i < this.count; i++) {
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(
        palletCoords[i].x + 0.5,
        palletCoords[i].y + 0.5,
        0.2
      );
      this.palletArray.push(this.mesh);
      this.scene.add(this.mesh);
    }
  }

  setPhysics() {}

  update() {
    for (let i = 0; i < this.count; i++) {
      if (
        this.pacman &&
        this.palletArray &&
        this.pacman.mesh.position.x < this.palletArray[i].position.x + 0.5 &&
        this.pacman.mesh.position.x > this.palletArray[i].position.x - 0.5 &&
        this.pacman.mesh.position.y < this.palletArray[i].position.y + 0.5 &&
        this.pacman.mesh.position.y > this.palletArray[i].position.y - 0.5
      ) {
        this.scene.remove(this.palletArray[i]);
      }
    }
  }
}
