import * as THREE from "three";
import Experience from "./Experience.js";
import { wallCoords } from "./WallCoords.js";
import { BOARD_WIDTH, BOARD_HEIGHT } from "./Dim.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.buildMap();
      }
    });
  }

  buildMap() {
    /**
     * Axes Helper
     */
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    /**
     * Plane
     */
    const planeGeometry = new THREE.PlaneGeometry(BOARD_WIDTH, BOARD_HEIGHT);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00f });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 0);
    this.scene.add(plane);

    /**
     * Walls
     */
    const dummy = new THREE.Object3D();
    const wallGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const wallMaterial = new THREE.MeshBasicMaterial();
    const count = wallCoords.length;
    const wall = new THREE.InstancedMesh(wallGeometry, wallMaterial, count);

    for (let i = 0; i < count; i++) {
      dummy.position.set(wallCoords[i].x + 0.5, wallCoords[i].y + 0.5, 0);
      dummy.updateMatrix();
      wall.setMatrixAt(i, dummy.matrix);
    }

    this.scene.add(wall);
  }

  resize() {}

  update() {}

  destroy() {}
}
