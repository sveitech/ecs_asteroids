/**
 * The registry maintains a collection of entities and their components.
 * An entity is just an identifier, a number, pointing to one or more
 * components.
 */
import { IComponent } from "components/component";
import Entity from "entity";

let nextEntityId: number = 0;

function createEntity() {
  nextEntityId += 1;
  return new Entity(nextEntityId);
}

export default class Registry {
  // entity_id -> (component-id -> component)
  private entities: Map<number, Map<number, IComponent>> = new Map();

  createEntity(...components: IComponent[]): Entity {
    let entity = createEntity();
    this.entities.set(entity.id, new Map());

    for (let component of components) {
      this.entities.get(entity.id).set(component.id, component);
    }

    return entity;
  }

  deleteEntity(entity: Entity) {
    this.entities.delete(entity.id);
  }

  deleteComponent(entity: Entity, componentId: number) {
    if (this.entities.has(entity.id)) {
      this.entities.get(entity.id).delete(componentId);
    }
  }

  entityCount(): number {
    return this.entities.size;
  }
}
