/**
 * The registry maintains a collection of entities and their components.
 * An entity is just an identifier, a number, pointing to one or more
 * components.
 */
import { IComponent, IComponentConstructor } from "components/component";
import { Entity } from "entity";

let nextEntityId: number = 0;

function createEntity() {
  nextEntityId += 1;
  return new Entity(nextEntityId);
}

export class Registry {
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

  deleteComponent<T extends IComponent>(entity: Entity, component: T) {
    this.deleteComponentById(entity, component.id);
  }

  deleteComponentById(entity: Entity, componentId: number) {
    if (this.entities.has(entity.id)) {
      this.entities.get(entity.id).delete(componentId);
    }
  }

  getComponents(entity: Entity): Map<number, IComponent> {
    if (this.entities.has(entity.id)) {
      return this.entities.get(entity.id);
    } else {
      return new Map();
    }
  }

  getComponent<T extends IComponent>(
    entity: Entity,
    component: IComponentConstructor<T>
  ): T | null {
    if (this.entities.has(entity.id)) {
      if (this.entities.get(entity.id).has(component.id)) {
        return this.entities.get(entity.id).get(component.id) as T;
      } else {
        return null;
      }
    }
  }

  *getEntities<T extends IComponent[]>(
    ...components: { [K in keyof T]: IComponentConstructor<T[K]> }
  ): Generator<[...T], void> {
    for (let [key, value] of this.entities) {
      let result: any[] = [];

      // If the entity has every component, return those components, grouped
      for (let [c_key, c_value] of components.entries()) {
        if (value.has(c_value.id)) {
          result.push(value.get(c_value.id) as typeof c_value);
        }
      }

      if (components.length == result.length) {
        yield result as [...T];
      }
    }
  }

  entityCount(): number {
    return this.entities.size;
  }
}
