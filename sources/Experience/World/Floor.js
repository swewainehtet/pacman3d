import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(
      Dim.BOARD_WIDTH,
      Dim.BOARD_HEIGHT,
      Dim.BOARD_WIDTH,
      Dim.BOARD_HEIGHT
    );
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: false,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(Dim.BOARD_WIDTH / 2, Dim.BOARD_HEIGHT / 2, 0);
    this.scene.add(this.mesh);
  }
}
