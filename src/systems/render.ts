import { Registry } from "registry";
import { Canvas } from "canvas";
import { Sprites } from "assets/sprites";
import * as components from "components";

export class Render {
  constructor(
    private registry: Registry,
    private canvas: Canvas,
    private sprites: Sprites
  ) {}

  update() {
    let c2d = this.canvas.context();

    for (let entity of this.registry.getEntities(
      components.Position,
      components.Orientation,
      components.Sprite
    )) {
      let [position, orientation, sprite] = entity;

      c2d.save();

      // Translate canvas to entity position, then rotate. This creates a
      // rotation around the entity center.
      c2d.translate(Math.floor(position.x), Math.floor(position.y));
      c2d.rotate((Math.PI / 180) * orientation.degrees);

      // Draw
      let spriteFunction = this.sprites.getSprite(sprite.name);

      if (spriteFunction) {
        spriteFunction(c2d);
      }

      c2d.restore();
    }

    c2d.stroke();
  }
}
