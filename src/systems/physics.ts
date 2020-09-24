import { Registry } from "registry";
import { Canvas } from "canvas";
import * as components from "components";
import { ISystem } from "systems/system";

export class Physics implements ISystem {
  constructor(private registry: Registry, private canvas: Canvas) {}

  update() {
    for (let entity of this.registry.getEntities(
      components.Position,
      components.Velocity
    )) {
      let [position, velocity] = entity;

      position.x += velocity.x;
      position.y += velocity.y;

      // Wrap around the canvas
      if (position.x > this.canvas.width()) {
        position.x -= this.canvas.width();
      }

      if (position.y > this.canvas.height()) {
        position.y -= this.canvas.height();
      }
    }
  }
}
