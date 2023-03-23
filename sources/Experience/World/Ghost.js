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
    // const moveset = [
    //   {
    //     x: this.model.position.x - 1,
    //     y: this.model.position.y,
    //     name: "left",
    //   },
    //   {
    //     x: this.model.position.x + 1,
    //     y: this.model.position.y,
    //     name: "right",
    //   },
    //   {
    //     x: this.model.position.x,
    //     y: this.model.position.y + 1,
    //     name: "up",
    //   },
    //   {
    //     x: this.model.position.x,
    //     y: this.model.position.y - 1,
    //     name: "down",
    //   },
    // ];
    // const moveable = [];
    // moveset.forEach((element) => {
    //   if (!this.ghostMovement.isWall(element.x, element.y)) {
    //     moveable.push(element);
    //   }
    // });
    // const random = moveable[Math.floor(Math.random() * moveable.length)];
    // this.moveStep(random.x, random.y);
  }

  moveStep(xx, yy) {
    console.log(this.model.position);
    gsap.to(this.model.position, {
      x: xx,
      y: yy,
      duration: 1,
    });
  }
}
