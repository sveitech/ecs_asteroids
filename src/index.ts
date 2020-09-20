import settings from "settings";
import { Canvas } from "canvas";
import * as drawing from "drawing";
import { IPoint } from "point";

import { Entity } from "entity";
import { Registry } from "registry";
//import * as components from "components";
import * as components from "components";
import * as systems from "systems";

(function () {
  let canvas = new Canvas(
    document.getElementById(settings.mainScreenHTMLElementID)
  );

  let registry = new Registry();

  console.log(components);

  // Create player
  let player = registry.createEntity(
    new components.Player(),
    new components.Position(100, 100),
    new components.Velocity(0, 0)
  );

  // Create systems
  let playerRender = new systems.PlayerRender(registry);

  playerRender.update();
})();
