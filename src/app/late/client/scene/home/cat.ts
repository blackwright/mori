import { Renderer } from '../renderer';

const CAT_COLOR = '#000';

export class Cat extends Renderer {
  private isWagging = false;
  private prevTailAngle = -Math.PI / 2;
  private headRadius: number;
  private bodyHeight: number;
  private bodyWidth: number;
  private x: number;
  private createdTimestamp: number;
  private tailWidth: number;
  private tailY: number;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    const { windowFrameThickness, oneThirdCanvasWidth, oneHalfCanvasHeight } =
      this;

    this.x = oneThirdCanvasWidth * 2 - windowFrameThickness * 1.2;
    this.headRadius = windowFrameThickness;
    this.bodyHeight = windowFrameThickness * 3;
    this.bodyWidth = windowFrameThickness * 2.2;
    this.createdTimestamp = Date.now();
    this.tailWidth = windowFrameThickness / 2;
    this.tailY =
      (oneHalfCanvasHeight * 3) / 2 + windowFrameThickness - this.tailWidth / 2;
  }

  head() {
    const { ctx, oneHalfCanvasHeight, x, headRadius } = this;
    const y = (oneHalfCanvasHeight * 3) / 2 - this.bodyHeight - this.headRadius;

    ctx.save();

    ctx.fillStyle = CAT_COLOR;
    ctx.strokeStyle = CAT_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, headRadius, 0, Math.PI * 2);
    ctx.fill();

    // ears
    ctx.translate(x, y);

    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';

    const rightEar = {
      start: {
        x: Math.sin(Math.PI * 0.85) * headRadius,
        y: Math.cos(Math.PI * 0.85) * headRadius,
      },
      point: {
        x: Math.sin(Math.PI * 0.8) * headRadius * 1.4,
        y: Math.cos(Math.PI * 0.8) * headRadius * 1.4,
      },
      end: {
        x: Math.sin(Math.PI * 0.7) * headRadius,
        y: Math.cos(Math.PI * 0.7) * headRadius,
      },
    };

    ctx.beginPath();
    ctx.moveTo(rightEar.start.x, rightEar.start.y);
    ctx.lineTo(rightEar.point.x, rightEar.point.y);
    ctx.lineTo(rightEar.end.x, rightEar.end.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const leftEar = {
      start: {
        x: Math.sin(Math.PI * 1.2) * headRadius,
        y: Math.cos(Math.PI * 1.2) * headRadius,
      },
      point: {
        x: Math.sin(Math.PI * 1.22) * headRadius * 1.5,
        y: Math.cos(Math.PI * 1.22) * headRadius * 1.5,
      },
      end: {
        x: Math.sin(Math.PI * 1.3) * headRadius,
        y: Math.cos(Math.PI * 1.3) * headRadius,
      },
    };

    ctx.beginPath();
    ctx.moveTo(leftEar.start.x, leftEar.start.y);
    ctx.lineTo(leftEar.point.x, leftEar.point.y);
    ctx.lineTo(leftEar.end.x, leftEar.end.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  body() {
    const {
      ctx,
      oneHalfCanvasHeight,
      windowFrameThickness,
      x,
      headRadius,
      bodyWidth,
      bodyHeight,
    } = this;

    ctx.save();

    const y = (oneHalfCanvasHeight * 3) / 2 - bodyHeight;

    ctx.beginPath();
    ctx.moveTo(x, y - headRadius / 2);
    ctx.quadraticCurveTo(
      x - bodyWidth * 0.75,
      y + bodyHeight / 4,
      x - bodyWidth / 3,
      y + bodyHeight + windowFrameThickness,
    );
    ctx.lineTo(x + bodyWidth / 2, y + bodyHeight + windowFrameThickness);
    ctx.quadraticCurveTo(
      x + bodyWidth * 1.2,
      y + bodyHeight + windowFrameThickness,
      x + bodyWidth / 3,
      y - headRadius / 3,
    );
    ctx.closePath();
    ctx.fill();

    // left leg
    ctx.beginPath();
    ctx.moveTo(x - bodyWidth / 4, y + bodyHeight * 0.3);
    ctx.quadraticCurveTo(
      x - bodyWidth,
      y + bodyHeight,
      x - bodyWidth / 3,
      y + bodyHeight + windowFrameThickness,
    );
    ctx.lineTo(x + bodyWidth / 2, y + bodyHeight + windowFrameThickness);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  fixedTail() {
    const { ctx, tailWidth, x, bodyWidth, tailY } = this;

    ctx.save();

    ctx.lineWidth = tailWidth;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, tailY);
    ctx.lineTo(x - bodyWidth, tailY);
    ctx.stroke();

    ctx.restore();
  }

  render() {
    const { ctx, canvasWidth, canvasHeight } = this;

    ctx.save();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    this.head();
    this.body();
    this.fixedTail();

    ctx.restore();
  }

  tick() {
    const {
      ctx,
      canvasWidth,
      canvasHeight,
      createdTimestamp,
      x,
      bodyWidth,
      tailY,
    } = this;
    // tail wag

    ctx.save();

    const timeDelta = Date.now() - createdTimestamp;

    // oscillate between angles
    let nextTailAngle =
      -Math.PI / 2 + (Math.sin(timeDelta / 200) * -Math.PI) / 20;

    if (this.prevTailAngle > -Math.PI / 2 && nextTailAngle < -Math.PI / 2) {
      // each oscillation has a chance of producing a tail wag
      this.isWagging = Math.random() > 0.5;
    }

    this.prevTailAngle = nextTailAngle;

    if (nextTailAngle > -Math.PI / 2) {
      nextTailAngle = -Math.PI / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    this.head();
    this.body();

    ctx.restore();

    if (!this.isWagging) {
      this.fixedTail();
      return;
    }

    ctx.save();

    ctx.lineWidth = this.tailWidth;
    ctx.lineCap = 'round';

    ctx.translate(x, tailY);

    const tailEnd = {
      x: Math.sin(nextTailAngle) * bodyWidth,
      y: Math.cos(nextTailAngle) * bodyWidth,
    };

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(
      -bodyWidth,
      (-Math.cos(nextTailAngle) * bodyWidth) / 10,
      tailEnd.x,
      tailEnd.y,
    );
    ctx.stroke();

    ctx.restore();
  }
}
