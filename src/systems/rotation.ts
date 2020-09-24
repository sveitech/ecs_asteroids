import { Registry } from "registry";
import { Canvas } from "canvas";
import * as components from "components";

export class Rotation {
  constructor(private registry: Registry) {}

  update() {
    for (let entity of this.registry.getEntities(
      components.Orientation,
      components.Rotation
    )) {
      let [orientation, rotation] = entity;
      orientation.degrees += rotation.rotationSpeed;
    }
  }
}
