/**
 * Component storing the rotational speed of an entity.
 *
 * Rotation speed is in degrees per frame.
 */

import { createComponentId, IComponent } from "components/component";

export class Rotation implements IComponent {
  static readonly id: number = createComponentId();

  constructor(public rotationSpeed = 0) {}

  get id() {
    return Rotation.id;
  }
}
