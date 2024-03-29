import Overlay from "./Overlay";
import { Text } from "troika-three-text";
import * as THREE from "three";
import vertexShader from "../Shaders/vertex_overlay.glsl";
import fragmentShader from "../Shaders/fragment_blue.glsl";

export default class WinScreen extends Overlay {
  static instance;
  constructor() {
    super();

    // Singleton constructor
    if (WinScreen.instance) {
      return WinScreen.instance;
    }
    WinScreen.instance = this;

    this.displayOverlay();
    this.display();
  }

  display() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uAlpha: { value: 1 },
      },
      transparent: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    this.message = new Text();
    this.message.text = "You Win!";
    this.message.fontSize = 0.2;
    this.message.anchorX = "50%";
    this.message.anchorY = "50%";
    this.message.position.x = 0;
    this.message.position.y = 0;
    this.message.color = 0x2266ff;
    this.message.material = this.material;
    this.scene.add(this.message);

    this.controlsOff();
  }
}
