import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.pacman = this.world.pacman;

    this.leftHandler = () => {
      this.pacman.mesh.position.x -= 1;
    };

    this.rightHandler = () => {
      this.pacman.mesh.position.x += 1;
    };

    this.upHandler = () => {
      this.pacman.mesh.position.y += 1;
    };
    this.downHandler = () => {
      this.pacman.mesh.position.y -= 1;
    };

    document.addEventListener("keydown", (event) => {
      const callback = {
        ArrowUp: this.upHandler,
        ArrowDown: this.downHandler,
        ArrowLeft: this.leftHandler,
        ArrowRight: this.rightHandler,
        w: this.upHandler,
        s: this.downHandler,
        a: this.leftHandler,
        d: this.rightHandler,
      }[event.key];
      callback?.();
    });
  }
}
