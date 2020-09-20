/**
 * TAG component for indicating the player entity.
 */

import { createComponentId, IComponent } from "components/component";

export class Player implements IComponent {
  static readonly id: number = createComponentId();

  constructor() {}

  get id() {
    return Player.id;
  }
}
