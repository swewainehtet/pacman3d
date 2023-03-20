import * as THREE from "three";
import * as Dim from "../Dim";
import { ghostCoords } from "./Coords/GhostCoords.js";
import Ghost from "./Ghost";

export default class Blinky extends Ghost {
  constructor() {
    super();

    this.setModel();
  }

  setModel() {
    this.model = this.resources.items.blinkyModel.scene;
    this.model.position.set(
      ghostCoords[0].x,
      ghostCoords[0].y,
      Dim.GHOST_SIZE * 2
    );
    this.model.scale.set(0.038, 0.038, 0.038);
    this.model.rotation.x = Math.PI / 2;
    this.model.traverse((object) => {
      if (object.isMesh)
        object.material = new THREE.MeshBasicMaterial({
          color: ghostCoords[0].color,
        });
    });

    this.scene.add(this.model);
  }

  update() {
    this.checkPacman();
    this.bounce1();
  }
}
