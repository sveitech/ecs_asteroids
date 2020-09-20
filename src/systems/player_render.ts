import { Registry } from "registry";
import { Canvas } from "canvas";
import * as components from "components";

export class PlayerRender {
  constructor(private registry: Registry) {}

  update() {
    for (let entity of this.registry.getEntities(
      components.Player,
      components.Position
    )) {
      let [_, position] = entity;
    }
  }
}
