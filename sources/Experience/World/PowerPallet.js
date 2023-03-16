import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";
import { powerPalletCoords } from "./Coords/PowerPalletCoords";

export default class PowerPallet {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

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
    this.dummy = new THREE.Object3D();
    this.count = powerPalletCoords.length;
    this.mesh = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      this.count
    );

    for (let i = 0; i < this.count; i++) {
      this.dummy.position.set(
        powerPalletCoords[i].x + 0.5,
        powerPalletCoords[i].y + 0.5,
        0.5
      );
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
    }
    this.scene.add(this.mesh);
  }
}
