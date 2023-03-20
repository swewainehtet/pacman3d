import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";
import gsap from "gsap";
import * as CANNON from "cannon-es";

export default class Pacman {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.physics = this.experience.world.physics;
    this.time = this.experience.time;

    this.setGeometry();
    this.setMaterial();
    this.setPhysics();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(Dim.PACMAN_RADIUS);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ color: 0xe47200 });
  }

  setPhysics() {
    this.shape = new CANNON.Sphere(Dim.PACMAN_RADIUS);
    this.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(14, 9.5, 0.25),
      shape: this.shape,
    });
    this.physics.addBody(this.body);
  }

  update() {
    this.physics.step(1 / 60, this.time.deltaTime, 1);
    if (this.body.position.x < 0) this.body.position.set(28, 18.5, 0.5);
    if (this.body.position.x > 28) this.body.position.set(0, 18.5, 0.5);
    this.mesh.position.copy(this.body.position);
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(14, 9.5, 0.25);
    this.scene.add(this.mesh);
  }

  moveLeft() {
    this.body.velocity.set(-Dim.PACMAN_SPEED, 0, 0);
  }

  moveRight() {
    this.body.velocity.set(Dim.PACMAN_SPEED, 0, 0);
  }

  moveUp() {
    this.body.velocity.set(0, Dim.PACMAN_SPEED, 0);
  }

  moveDown() {
    this.body.velocity.set(0, -Dim.PACMAN_SPEED, 0);
  }

  jump() {
    this.body.velocity.set(0, 0, 2);
  }
}
