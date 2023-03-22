import * as Dim from "../Dim";
import Experience from "../Experience";

export default class Ghost {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.pacman = this.experience.world.pacman;
  }

  bounce1() {
    this.model.position.z =
      Dim.GHOST_SIZE * 2 + 0.2 * Math.sin(this.time.current * 0.005);
  }

  bounce2() {
    this.model.position.z =
      Dim.GHOST_SIZE * 2 + 0.2 * Math.cos(this.time.current * 0.005);
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
      this.experience.world.controls.off();
    }
  }
}
