import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";
import { wallCoords } from "./Coords/WallCoords";
import CANNON from "cannon";

export default class Wall {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.physics = this.experience.world.physics;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setPhysics();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(Dim.WALL_WIDTH, Dim.WALL_HEIGHT, 0.5);
  }

  setMaterial() {
    this.material = [
      new THREE.MeshBasicMaterial({ map: this.resources.items.wallX }),
      new THREE.MeshBasicMaterial({ map: this.resources.items.wallX }),
      new THREE.MeshBasicMaterial({ map: this.resources.items.wallY }),
      new THREE.MeshBasicMaterial({ map: this.resources.items.wallY }),
      new THREE.MeshBasicMaterial({ map: this.resources.items.wallZ }),
      new THREE.MeshBasicMaterial({ map: this.resources.items.wallZ }),
    ];
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
        0.25
      );
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
    }

    this.scene.add(this.mesh);
  }

  setPhysics() {
    this.shape = new CANNON.Box(
      new CANNON.Vec3(Dim.WALL_WIDTH / 2, Dim.WALL_HEIGHT / 2, 0.5)
    );
    for (let i = 0; i < this.count; i++) {
      this.body = new CANNON.Body();
      this.body.mass = 0;
      this.body.addShape(this.shape);
      this.body.position.set(
        wallCoords[i].x + Dim.WALL_WIDTH / 2,
        wallCoords[i].y + Dim.WALL_HEIGHT / 2,
        0.25
      );
      this.physics.addBody(this.body);
    }
  }
}
