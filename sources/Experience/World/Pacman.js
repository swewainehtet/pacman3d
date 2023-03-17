import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";

export default class Pacman {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(Dim.PACMAN_RADIUS);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ color: 0xe47200 });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(14.5, 9.5, 0.25);
    this.scene.add(this.mesh);
  }
}
