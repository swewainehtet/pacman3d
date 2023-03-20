import * as THREE from "three";
import * as Dim from "../Dim";
import { ghostCoords } from "./Coords/GhostCoords.js";
import Ghost from "./Ghost";

export default class Inky extends Ghost {
  constructor() {
    super();

    this.setModel();
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

  update() {
    this.checkPacman();
    this.bounce2();
  }
}
