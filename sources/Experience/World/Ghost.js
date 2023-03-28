import * as Dim from "../Dim";
import Experience from "../Experience";
import GhostMovement from "../Physics/GhostMovement";
import gsap from "gsap";

export default class Ghost {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.pacman = this.experience.world.pacman;
    this.ghostMovement = new GhostMovement();
    this.physics = this.experience.world.physics;

    this.lastTimeRecorded = 0;
  }

  bounce1() {
    this.model.position.z =
      Dim.GHOST_SIZE * 2 + 0.2 * Math.sin(this.time.elapsed * 0.005);
  }

  bounce2() {
    this.model.position.z =
      Dim.GHOST_SIZE * 2 + 0.2 * Math.cos(this.time.elapsed * 0.005);
  }

  checkPacman() {
    if (
      this.pacman &&
      this.pacman.mesh.position.x < this.model.position.x + 0.5 &&
      this.pacman.mesh.position.x > this.model.position.x - 0.5 &&
      this.pacman.mesh.position.y < this.model.position.y + 0.5 &&
      this.pacman.mesh.position.y > this.model.position.y - 0.5
    ) {
      this.experience.world.displayLoseScreen();
    }
  }

  moveRandom() {
    if (
      !this.lastTimeRecorded ||
      this.time.elapsed - this.lastTimeRecorded > 1000
    ) {
      this.lastTimeRecorded = this.time.elapsed;
      this.body.velocity.set(
        Dim.PACMAN_SPEED * (Math.random() * 2 - 1),
        Dim.PACMAN_SPEED * (Math.random() * 2 - 1),
        0
      );
    }
  }
}
