import { wallCoords } from "../World/Coords/WallCoords";

export default class GhostMovement {
  static instance;

  constructor() {
    //Singleton constructor
    if (GhostMovement.instance) {
      return GhostMovement.instance;
    }
    GhostMovement.instance = this;

    this.wallMap = new Map(
      [...wallCoords].map((e) => [
        Math.round(e.x).toString() + "," + Math.round(e.y).toString(),
        1,
      ])
    );
  }

  isWall(x, y) {
    return this.wallMap.has(x.toString() + "," + y.toString());
  }
}
