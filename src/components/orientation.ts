/**
 * Component storing the orientation of an object.
 * Orientation is given as a number of decimal degrees, 0 to 359.
 * 0 degrees is horizontal, pointing right.
 */
import { createComponentId, IComponent } from "components/component";

export class Orientation implements IComponent {
  static readonly id: number = createComponentId();

  constructor(public degrees = 0) {}

  get id() {
    return Orientation.id;
  }
}
