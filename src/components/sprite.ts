/**
 * Component storing the sprite to use for an entity.
 *
 * Note how components must implement the "id" property. which is a unique
 * value for a component type (class-type, not unique per instance).
 */

import { createComponentId, IComponent } from "components/component";

export class Sprite implements IComponent {
  static readonly id: number = createComponentId();

  constructor(public name: string) {}

  get id() {
    return Sprite.id;
  }
}
