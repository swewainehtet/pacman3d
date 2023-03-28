import * as THREE from "three";
import * as Dim from "../Dim";
import { ghostCoords } from "./Coords/GhostCoords.js";
import Ghost from "./Ghost";
import * as CANNON from "cannon-es";

export default class Inky extends Ghost {
  constructor() {
    super();

    this.setModel();
    this.setPhysics();
  }

  setModel() {
    this.model = this.resources.items.inkyModel.scene;
    this.model.position.set(
      ghostCoords[1].x,
      ghostCoords[1].y,
      Dim.GHOST_SIZE * 2
    );
    this.model.scale.set(0.038, 0.038, 0.038);
    this.model.rotation.x = Math.PI / 2;
    this.model.traverse((object) => {
      if (object.isMesh)
        object.material = new THREE.MeshBasicMaterial({
          color: ghostCoords[1].color,
        });
    });

    this.scene.add(this.model);
  }

  setPhysics() {
    this.shape = new CANNON.Sphere(Dim.GHOST_SIZE / 3);
    this.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(14, 21, 0.25),
      shape: this.shape,
    });
    this.physics.addBody(this.body);
  }

  update() {
    this.checkPacman();
    this.model.position.x = this.body.position.x;
    this.model.position.y = this.body.position.y;

    this.bounce2();
    this.moveRandom();
  }
}
