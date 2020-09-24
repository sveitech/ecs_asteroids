import settings from "settings";
import { Canvas } from "canvas";
import * as drawing from "drawing";
import { IPoint } from "point";

import { Entity } from "entity";
import { Registry } from "registry";
import * as components from "components";
import * as systems from "systems";
import * as assets from "assets";

(function () {
  let canvas = new Canvas(
    document.getElementById(settings.mainScreenHTMLElementID)
  );

  let registry = new Registry();

  // Create player
  let player = registry.createEntity(
    new components.Player(),
    new components.Sprite("ship"),
    new components.Position(canvas.width() / 2, canvas.height() / 2),
    new components.Velocity(0, 0),
    new components.Orientation(0),
    new components.Rotation(1)
  );

  // Create bunch of asteroids
  let asteroids: Entity[] = [];

  for (let i = 0; i < 1000; i++) {
    asteroids.push(
      registry.createEntity(
        new components.Sprite("asteroid"),
        new components.Position(
          Math.random() * canvas.width(),
          Math.random() * canvas.height()
        ),
        new components.Orientation(Math.random() * 360),
        new components.Rotation(Math.random() * 3),
        new components.Velocity(Math.random() * 2, Math.random() * 2)
      )
    );
  }

  // Assets
  let sprites = new assets.Sprites();

  // Create systems
  let systemsList = [
    new systems.Render(registry, canvas, sprites),
    new systems.Rotation(registry),
    new systems.Physics(registry, canvas),
  ];

  // Run the main loop
  let time = performance.now();

  function main() {
    // Calculate time since last frame
    let newTime = performance.now();

    window.requestAnimationFrame(main);
    canvas.clear();

    drawing.drawTarget(canvas.context(), {
      x: canvas.width() / 2,
      y: canvas.height() / 2,
    });

    for (let system of systemsList) {
      system.update();
    }

    let renderTime = performance.now();
    console.log(
      `Render time: ${renderTime - newTime}, time since last frame: ${
        newTime - time
      }`
    );
    time = newTime;
  }

  window.requestAnimationFrame(main);
})();
