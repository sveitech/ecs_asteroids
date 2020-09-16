import Registry from "registry";
import { IComponent } from "components/component";
import Position from "components/position";
import Velocity from "components/velocity";

test("add entity to register", () => {
  let registry = new Registry();
  registry.createEntity();

  expect(registry.entityCount()).toBe(1);
});

test("add entities to register", () => {
  let registry = new Registry();

  for (let i = 0; i < 100; i++) {
    registry.createEntity();
  }

  expect(registry.entityCount()).toBe(100);
});

test("delete component", () => {
  let registry = new Registry();
  let entity = registry.createEntity(new Position());

  expect(registry.entityCount()).toBe(1);
  expect(registry.getComponents(entity).size).toBe(1);
  registry.deleteComponent(entity, Position);
  expect(registry.getComponents(entity).size).toBe(0);
});

test("get component", () => {
  let registry = new Registry();
  let entity = registry.createEntity(new Position(100, 200));

  let component: Position = registry.getComponent(entity, Position);
  expect(component.x).toBe(100);
  expect(component.y).toBe(200);
});

test("get entities", () => {
  let registry = new Registry();
  registry.createEntity(new Position(1, 2));
  registry.createEntity(new Position(2, 3));
  registry.createEntity(new Position(3, 4), new Velocity(0, 0));

  for (let [e] of registry.getEntities(Position)) {
    console.log(e);
  }

  console.log("VELOCITIES");

  for (let [p, v] of registry.getEntities(Position, Velocity)) {
    console.log(p, v);
  }
});
