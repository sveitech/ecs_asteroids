/**
 * Useful routines for drawing on a canvas. All functions are pixel
 * oriented.
 */

import * as point from "./point";

function resetLineStyle(context: CanvasRenderingContext2D) {
  context.lineWidth = 1.0;
}

/**
 * Draws a coordinate as a vertical and horizontal line, extending to the
 * edges of the 2D context.
 */
export function drawTarget(
  context: CanvasRenderingContext2D,
  coordinate: point.IPoint
) {
  const context_width = context.canvas.width;
  const context_height = context.canvas.height;

  resetLineStyle(context);

  context.beginPath();
  context.moveTo(0, coordinate.y);
  context.lineTo(context_width, coordinate.y);
  context.stroke();
  context.moveTo(coordinate.x, 0);
  context.lineTo(coordinate.x, context_height);
  context.stroke();
}
