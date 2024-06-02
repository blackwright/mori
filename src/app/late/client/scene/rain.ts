const TIME_TO_FALL = 200;
const RAINDROPS_HEIGHTWISE = 5;
const RAINDROP_COLOR = '#788';

class Raindrop {
  private createdAt: number;

  public y = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvasHeight: number,
    public x: number,
    public height: number,
  ) {
    this.createdAt = Date.now();
  }

  tick(now: number) {
    const timeDelta = now - this.createdAt;
    this.y = Math.floor((timeDelta / TIME_TO_FALL) * this.canvasHeight);
  }

  render() {
    const { ctx, x, y, height } = this;

    ctx.save();

    ctx.strokeStyle = RAINDROP_COLOR;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();

    ctx.restore();
  }
}

export class Rainfall {
  public canvasWidth: number;
  public canvasHeight: number;

  private raindrops: Raindrop[] = [];
  private raindropHeight: number;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;

    this.raindropHeight = Math.floor(this.canvasHeight / RAINDROPS_HEIGHTWISE);
  }

  tick() {
    const { raindrops, canvasHeight } = this;

    const now = Date.now();

    for (let i = raindrops.length - 1; i >= 0; i--) {
      const raindrop = raindrops[i];
      raindrop.tick(now);

      // remove raindrops that have fallen out of view
      if (raindrop.y >= canvasHeight) {
        raindrops.splice(i, 1);
      }
    }
  }

  add() {
    const { ctx, canvasWidth, canvasHeight, raindrops, raindropHeight } = this;

    const startingX = Math.random() * canvasWidth;

    raindrops.push(new Raindrop(ctx, canvasHeight, startingX, raindropHeight));
  }

  render() {
    this.raindrops.forEach((raindrop) => raindrop.render());
  }
}
