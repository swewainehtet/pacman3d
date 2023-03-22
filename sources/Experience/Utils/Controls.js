import Experience from "../Experience";
import gsap from "gsap";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.pacman = this.world.pacman;

    this.leftHandler = () => {
      this.pacman.moveLeft();
    };

    this.rightHandler = () => {
      this.pacman.moveRight();
    };

    this.upHandler = () => {
      this.pacman.moveUp();
    };
    this.downHandler = () => {
      this.pacman.moveDown();
    };
    this.jumpHandler = () => {
      this.pacman.jump();
    };

    this.keydownEvent = (event) => {
      const callback = {
        ArrowUp: this.upHandler,
        ArrowDown: this.downHandler,
        ArrowLeft: this.leftHandler,
        ArrowRight: this.rightHandler,
        w: this.upHandler,
        s: this.downHandler,
        a: this.leftHandler,
        d: this.rightHandler,
        " ": this.jumpHandler,
      }[event.key];
      callback?.();
    };

    document.addEventListener("keydown", this.keydownEvent);
  }

  off() {
    document.removeEventListener("keydown", this.keydownEvent);
  }
}
