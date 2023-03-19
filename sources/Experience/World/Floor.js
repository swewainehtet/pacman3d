import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";
import * as CANNON from "cannon-es";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.physics = this.experience.world.physics;

    this.setGeometry();
    this.setMaterial();
    this.setPhysics();
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
      color: 0x000005,
      wireframe: false,
    });
  }

  setPhysics() {
    this.shape = new CANNON.Plane();
    this.body = new CANNON.Body();
    this.body.mass = 0;
    this.body.addShape(this.shape);
    this.physics.addBody(this.body);
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(Dim.BOARD_WIDTH / 2, Dim.BOARD_HEIGHT / 2, 0);
    this.scene.add(this.mesh);
  }
}
