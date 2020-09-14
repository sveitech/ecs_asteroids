/**
 * Creates and maintains a canvas and 2D context for rendering. The canvas
 * is added to the element given in the constructor.
 */

export default class Canvas {
    private canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor(readonly containerElement: HTMLElement) {
        this.canvas = document.createElement('canvas');
        this._context = this.canvas.getContext('2d');

        containerElement.appendChild(this.canvas);
    }

    context() {
        return this.context;
    }
}
