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

  /**
   * Why does this work? How is component passed as a type? It works because
   * plain javascript does not know anything about classes.
   * 
   * We need to look at how the raw javascript looks for the Position class
   * for example:
   * 
   * ES5:
    
    var position_Position = (function () {
    function Position(x, y) {
      if (x === void 0) { x = 0; }
      if (y === void 0) { y = 0; }
      this.x = x;
      this.y = y;
    }
    Object.defineProperty(Position.prototype, "id", {
        get: function () {
            return Position.id;
        },
        enumerable: false,
        configurable: true
    });
    Position.id = createComponentId();
    return Position;
  }());

  ES2020:
        class Position {
          constructor(x = 0, y = 0) {
              this.x = x;
              this.y = y;
          }
          get id() {
              return Position.id;
          }
      }
      Position.id = createComponentId();

  In both cases, what we end up with, is a constructor function object. The
  new class syntax in later JS versions is still handled like a contructor
  function internally. So, in effect, what we are passing is not a "Class", its
  a constructor function, with properties! That's why it matches our object
  type declaration:
       { id: number; new (...arg: any): T }
  and why we have direct access to the id property, and we can invoke new()
  on the object as well.
   */
  // deleteComponent<T extends IComponent>(
  //   entity: Entity,
  //   component: { id: number; new (...arg: any): T }
  // ) {
  //   this.deleteComponentById(entity, component.id);
  // }

  deleteComponent<T extends IComponent>(entity: Entity, component: T) {
    this.deleteComponentById(entity, component.id);
  }

  deleteComponentById(entity: Entity, componentId: number) {
    if (this.entities.has(entity.id)) {
      this.entities.get(entity.id).delete(componentId);
    }
  }

  /**
   * Return all components belonging to an entity.
   */
  getComponents(entity: Entity): Map<number, IComponent> {
    if (this.entities.has(entity.id)) {
      return this.entities.get(entity.id);
    } else {
      return new Map();
    }
  }

  getComponent<T extends IComponent>(
    entity: Entity,
    component: { id: number; new (...arg: any): T }
  ): T | null {
    if (this.entities.has(entity.id)) {
      if (this.entities.get(entity.id).has(component.id)) {
        return this.entities.get(entity.id).get(component.id) as T;
      } else {
        return null;
      }
    }
  }

  /**
   * Generator function.
   * Returns a tuple, matching the requested components.
   * For example:
   *    for(let e of getEntities(A, B, C))
   * will yield:
   *    [A, B, C]
   *
   * Instead of creating a new tuple, reuse the components tuple memory.
   */
  *getEntities<T extends IComponent>(...components: T[]): Generator<T[], void> {
    for (let [key, value] of this.entities) {
      //let result: any = [];

      let hits: number = 0;

      // If the entity has every component, return those components, grouped
      for (let [c_key, c_value] of components.entries()) {
        if (value.has(c_value.id)) {
          hits += 1;
          //result.push(value.get(c.id));
          components[c_key] = value.get(c_value.id) as typeof c_value;
        }
      }

      if (hits == components.length) {
        yield components;
      }
      // if (result.length == components.length) {
      //   // All components found!
      //   yield result;
      // }
    }
  }

  entityCount(): number {
    return this.entities.size;
  }
}
