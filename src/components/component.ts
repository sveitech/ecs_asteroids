/**
 * Component interface.
 *
 * TODO:
 */

let nextComponentId: number = 0;

export function createComponentId(): number {
  nextComponentId += 1;
  return nextComponentId;
}

export interface IComponent {
 readonly id: number;
}
