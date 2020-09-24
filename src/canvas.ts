/**
 * Creates and maintains a canvas and 2D context for rendering. The canvas
 * is added to the element given in the constructor.
 */

export class Canvas {
  private canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  constructor(readonly containerElement: HTMLElement) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = containerElement.clientWidth;
    this.canvas.height = containerElement.clientHeight;
    this._context = this.canvas.getContext("2d", { alpha: false });

    console.log(this.canvas.width);

    containerElement.appendChild(this.canvas);
  }

  context(): CanvasRenderingContext2D {
    return this._context;
  }

  width(): number {
    return this.canvas.width;
  }

  height(): number {
    return this.canvas.height;
  }

  clear(): void {
    this._context.fillStyle = "white";
    this._context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
