import settings from "settings";
import Canvas from "canvas";
import * as drawing from "drawing";
import { IPoint } from "point";

import Entity from "entity";
import Registry from "registry";
import Position from "components/position";

(function () {
  let canvas = new Canvas(
    document.getElementById(settings.mainScreenHTMLElementID)
  );

  let registry = new Registry();

  // Create player
  let player: Entity = registry.createEntity(new Position(100, 100));
})();
