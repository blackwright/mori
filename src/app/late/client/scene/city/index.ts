import { randomNumberBetween } from '@/utils/numbers';
import { Renderer } from '../renderer';
import { getRandomColor } from '../utils';
import { Building } from './building';

const BACKGROUND_COLOR = '#08080a';
const LAYER_OVERLAY_COLOR = 'rgba(33, 33, 33, 0.3)';

const MAX_BUILDING_HEIGHT_RATIO = 0.95;
const MIN_BUILDING_HEIGHT_RATIO = 0.3;
const MIN_BUILDING_WIDTH_RATIO = 0.08;
const MAX_BUILDING_WIDTH_RATIO = 0.15;
const MIN_BUILDING_GAP_RATIO = 0.02;
const MAX_BUILDING_GAP_RATIO = 0.05;
const NUMBER_OF_LAYERS = 4;

export class City extends Renderer {
  private layers: Building[][] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
    this.generateBuildings();
  }

  generateBuildings() {
    const { ctx, canvasWidth, canvasHeight } = this;

    for (let i = 0; i < NUMBER_OF_LAYERS; i++) {
      // buildings per layer
      const layer: Building[] = [];
      let x = canvasWidth / 3;

      while (x < (canvasWidth * 2) / 3) {
        const width =
          randomNumberBetween(
            MIN_BUILDING_WIDTH_RATIO,
            MAX_BUILDING_WIDTH_RATIO,
            2,
          ) * canvasWidth;

        const height =
          randomNumberBetween(
            MIN_BUILDING_HEIGHT_RATIO,
            MAX_BUILDING_HEIGHT_RATIO,
            2,
          ) * canvasHeight;

        const gap =
          randomNumberBetween(MIN_BUILDING_GAP_RATIO, MAX_BUILDING_GAP_RATIO) *
          canvasWidth;

        const building = new Building({
          y: canvasHeight - height,
          color: getRandomColor(),
          ctx,
          canvasHeight,
          x,
          width,
          height,
        });

        layer.push(building);

        x += width + gap;
      }

      // offset the buildings so the leftmost starts off screen
      const leftMostBuilding = layer[0];

      const xOffset = randomNumberBetween(
        leftMostBuilding.width * 0.25,
        leftMostBuilding.width * 0.75,
      );

      layer.forEach((building) => (building.x -= xOffset));
      this.layers.push(layer);
    }
  }

  render() {
    const { ctx, canvasWidth, canvasHeight, layers } = this;

    ctx.save();

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < layers.length; i++) {
      const currentLayer = layers[i];

      if (i > 0) {
        currentLayer.forEach((building) => building.generateLights());
      }

      for (const building of currentLayer) {
        building.render();
      }

      // fade each layer out a bit
      ctx.fillStyle = LAYER_OVERLAY_COLOR;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // garbage collect
    this.layers = [];

    ctx.restore();
  }
}
