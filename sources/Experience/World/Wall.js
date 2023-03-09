import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";
import { wallCoords } from "./Coords/WallCoords";

export default class Wall {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(Dim.WALL_WIDTH, Dim.WALL_HEIGHT, 1);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0x7792cb,
      wireframe: false,
    });
  }

  setMesh() {
    this.dummy = new THREE.Object3D();
    this.count = wallCoords.length;
    this.mesh = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      this.count
    );

    for (let i = 0; i < this.count; i++) {
      this.dummy.position.set(
        wallCoords[i].x + Dim.WALL_WIDTH / 2,
        wallCoords[i].y + Dim.WALL_HEIGHT / 2,
        0
      );
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
    }

    this.scene.add(this.mesh);
  }
}
