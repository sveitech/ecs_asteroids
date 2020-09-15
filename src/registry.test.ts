import Registry from "registry";
import { IComponent } from "components/component";

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
