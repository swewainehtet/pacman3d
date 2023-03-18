import * as THREE from "three";
import Experience from "./Experience.js";

import Floor from "./World/Floor.js";
import Wall from "./World/Wall.js";

import PowerPallet from "./World/PowerPallet.js";
import Pallet from "./World/Pallet.js";

import Pacman from "./World/Pacman.js";
import Blinky from "./World/Blinky.js";
import Inky from "./World/Inky.js";
import Pinky from "./World/Pinky.js";
import Clyde from "./World/Clyde.js";

import CANNON from "cannon";
import Controls from "./Utils/Controls.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setPhysics();
        this.buildMap();
        this.setControls();
      }
    });
  }

  setPhysics() {
    this.physics = new CANNON.World();
    this.physics.gravity.set(0, 0, -9.81);
  }

  buildMap() {
    /**
     * Axes Helper
     */
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    this.floor = new Floor();
    this.wall = new Wall();
    this.powerPallet = new PowerPallet();
    this.pallet = new Pallet();
    this.pacman = new Pacman();
    this.blinky = new Blinky();
    this.inky = new Inky();
    this.pinky = new Pinky();
    this.clyde = new Clyde();
  }

  setControls() {
    this.controls = new Controls();
  }

  resize() {}

  update() {
    if (this.pacman) this.pacman.update();
    if (this.blinky) this.blinky.update();
    if (this.inky) this.inky.update();
    if (this.pinky) this.pinky.update();
    if (this.clyde) this.clyde.update();
  }

  destroy() {}
}
