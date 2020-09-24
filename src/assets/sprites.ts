/**
 * A set of "sprites", stored as a map og strings pointing to drawing
 * functions. For example, the player entity could have its sprite component
 * set to "ship" and the asteroid to "asteroid". The sprite name is used to
 * select a drawing function.
 */
export class Sprites {
  private sprites: Map<
    string,
    (c2d: CanvasRenderingContext2D) => void
  > = new Map();

  constructor() {
    // Predefine some sprites

    // SHIP
    this.addSprite("ship", (c2d: CanvasRenderingContext2D): void => {
      const size = 20;
      const width = size;
      const height = size * 2;

      c2d.save();
      c2d.moveTo(-Math.floor(height * (1 / 3)), -width);
      c2d.lineTo(Math.floor(height * (2 / 3)), 0);
      c2d.lineTo(-Math.floor(height * (1 / 3)), width);
      c2d.lineTo(-Math.floor(height * (1 / 3)), -width);
      //c2d.stroke();
      c2d.restore();
    });

    // ASTEROID
    this.addSprite("asteroid", (c2d: CanvasRenderingContext2D): void => {
      const size = 10;

      c2d.save();
      c2d.moveTo(-size, -size);
      c2d.lineTo(size, -size);
      c2d.lineTo(size, size);
      c2d.lineTo(-size, size);
      c2d.lineTo(-size, -size);
      //c2d.stroke();
      c2d.restore();
    });
  }

  addSprite(name: string, sprite: (c2d: CanvasRenderingContext2D) => void) {
    this.sprites.set(name, sprite);
  }

  getSprite(name: string): (c2d: CanvasRenderingContext2D) => void | null {
    if (this.sprites.has(name)) {
      return this.sprites.get(name);
    } else {
      return null;
    }
  }
}
