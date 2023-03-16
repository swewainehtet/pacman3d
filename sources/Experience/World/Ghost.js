import Experience from "../Experience";
import * as THREE from "three";
import * as Dim from "../Dim";
import { ghostCoords } from "./Coords/GhostCoords.js";

export default class Ghost {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.setGeometry();
    this.setMaterial();
    // this.setModel();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.OctahedronGeometry(Dim.GHOST_SIZE);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial();
  }

  // setModel() {
  //   this.ghosts = [];
  //   this.colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
  //   this.material = new THREE.MeshBasicMaterial();
  //   this.model = this.resources.items.ghostModel.scene;
  //   this.model.scale.set(0.1, 0.1, 0.1);

  //   this.count = ghostCoords.length;

  //   for (let i = 0; i < this.count; i++) {
  //     this.model.position.set(
  //       ghostCoords[i].x,
  //       ghostCoords[i].y,
  //       Dim.GHOST_SIZE
  //     );
  //     this.ghosts.push(structuredClone(this.model));
  //   }

  //   for (let i = 0; i < this.count; i++) {
  // this.ghosts[i].traverse((object) => {
  //   if (object.isMesh)
  //     object.material = new THREE.MeshBasicMaterial({
  //       color: this.colors[i],
  //     });
  // });
  //     this.scene.add(this.ghosts[i]);
  //   }
  // }

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

  update() {
    this.mesh.position.z = 0.5 * Math.sin(this.time.current * 0.005);
  }
}
