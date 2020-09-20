/**
 * Component storing the position of an entity.
 * 
 * Note how components must implement the "id" property. which is a unique
 * value for a component type (class-type, not unique per instance).
 */

import { createComponentId, IComponent } from "components/component";

export class Position implements IComponent {
  static readonly id: number = createComponentId();

  constructor(public x: number = 0, public y: number = 0) {}

  get id() {
    return Position.id;
  }
}
