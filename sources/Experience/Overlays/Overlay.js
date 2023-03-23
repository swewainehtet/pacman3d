import Experience from "../Experience";
import * as THREE from "three";

export default class Overlay {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
  }

  displayOverlay() {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uAlpha: { value: 1 },
      },
      transparent: true,
      vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
        `,
      fragmentShader: `
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
        }
        `,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);
  }

  controlsOff() {
    this.experience.world.controls.off();
  }
}
