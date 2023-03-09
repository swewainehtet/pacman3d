import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";
import { ghostCoords } from "./Coords/GhostCoords.js";

export default class Ghost {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.OctahedronGeometry(Dim.GHOST_SIZE);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial();
  }

  setMesh() {
    this.dummy = new THREE.Object3D();
    this.count = ghostCoords.length;
    this.mesh = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      this.count
    );

    for (let i = 0; i < this.count; i++) {
      this.dummy.position.set(
        ghostCoords[i].x,
        ghostCoords[i].y,
        Dim.GHOST_SIZE
      );
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
      this.mesh.setColorAt(i, new THREE.Color(ghostCoords[i].color));
      this.mesh.instanceColor.needsUpdate = true;
    }

    this.scene.add(this.mesh);
  }
}
