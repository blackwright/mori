import { type Texture } from 'three';
import { CloudsGroup } from './CloudsGroup';
import { StarsPointCloud } from './StarsPointCloud';

type Props = {
  textures: [Texture, Texture];
};

export function Scene({ textures }: Props) {
  return (
    <>
      <StarsPointCloud count={2_000} />
      <CloudsGroup count={25} textures={textures} />
      <ambientLight color={0xffffff} intensity={1} />
    </>
  );
}
