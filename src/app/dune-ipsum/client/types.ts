import { type BufferGeometry } from 'three';

export type TextState = {
  key: number;
  geometry: BufferGeometry;
  maxVisibleTime: number;
};
