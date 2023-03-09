import * as THREE from "three";
import Experience from "./Experience.js";
import Floor from "./World/Floor.js";
import Wall from "./World/Wall.js";
import PowerPallet from "./World/PowerPallet.js";
import Pallet from "./World/Pallet.js";
import Pacman from "./World/Pacman.js";
import Ghost from "./World/Ghost.js";

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

    this.floor = new Floor();
    this.wall = new Wall();
    this.powerPallet = new PowerPallet();
    this.pallet = new Pallet();
    this.pacman = new Pacman();
    this.ghost = new Ghost();
  }

  resize() {}

  update() {}

  destroy() {}
}
