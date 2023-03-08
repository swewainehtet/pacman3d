import * as THREE from "three";
import Experience from "./Experience.js";
import { wallCoords } from "./WallCoords.js";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  WALL_WIDTH,
  WALL_HEIGHT,
  POWERPALLET_RADIUS,
  PALLET_RADIUS,
} from "./Dim.js";
import { powerPalletCoords } from "./PowerPalletCoords.js";
import { palletCoords } from "./PalletCoords.js";

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
    // this.scene.add(axesHelper);

    /**
     * Plane
     */
    const planeGeometry = new THREE.PlaneGeometry(
      BOARD_WIDTH,
      BOARD_HEIGHT,
      BOARD_WIDTH,
      BOARD_HEIGHT
    );
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x000,
      wireframe: false,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 0);
    this.scene.add(plane);

    /**
     * Walls
     */
    const wallDummy = new THREE.Object3D();
    const wallGeometry = new THREE.BoxBufferGeometry(
      WALL_WIDTH,
      WALL_HEIGHT,
      1
    );
    const wallMaterial = new THREE.MeshBasicMaterial({
      color: 0x7792cb,
      wireframe: false,
    });
    const wallCount = wallCoords.length;
    const wall = new THREE.InstancedMesh(wallGeometry, wallMaterial, wallCount);

    for (let i = 0; i < wallCount; i++) {
      wallDummy.position.set(
        wallCoords[i].x + WALL_WIDTH / 2,
        wallCoords[i].y + WALL_HEIGHT / 2,
        0
      );
      wallDummy.updateMatrix();
      wall.setMatrixAt(i, wallDummy.matrix);
    }
    this.scene.add(wall);

    /**
     * Power Pallets
     */
    const powerPalletDummy = new THREE.Object3D();
    const powerPalletGeometry = new THREE.SphereGeometry(POWERPALLET_RADIUS);
    const powerPalletMaterial = new THREE.MeshBasicMaterial({
      color: 0xcc7722,
      wireframe: false,
    });
    const powerPalletCount = powerPalletCoords.length;
    const powerPallet = new THREE.InstancedMesh(
      powerPalletGeometry,
      powerPalletMaterial,
      powerPalletCount
    );
    for (let i = 0; i < powerPalletCount; i++) {
      powerPalletDummy.position.set(
        powerPalletCoords[i].x + 0.5,
        powerPalletCoords[i].y + 0.5,
        0.5
      );
      powerPalletDummy.updateMatrix();
      powerPallet.setMatrixAt(i, powerPalletDummy.matrix);
    }
    this.scene.add(powerPallet);

    /**
     * Pallets
     */
    const palletDummy = new THREE.Object3D();
    const palletGeometry = new THREE.SphereGeometry(PALLET_RADIUS);
    const palletMaterial = new THREE.MeshBasicMaterial({
      color: 0xf8e473,
    });
    const palletCount = palletCoords.length;
    const pallet = new THREE.InstancedMesh(
      palletGeometry,
      palletMaterial,
      palletCount
    );
    for (let i = 0; i < palletCount; i++) {
      palletDummy.position.set(
        palletCoords[i].x + 0.5,
        palletCoords[i].y + 0.5,
        0.2
      );
      palletDummy.updateMatrix();
      pallet.setMatrixAt(i, palletDummy.matrix);
    }
    this.scene.add(pallet);
  }

  resize() {}

  update() {}

  destroy() {}
}
