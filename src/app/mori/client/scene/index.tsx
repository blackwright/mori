import { CloudsGroup } from './CloudsGroup';
import { StarsPointCloud } from './StarsPointCloud';

export const Scene: React.FC = () => {
  return (
    <>
      <StarsPointCloud count={2_000} />
      <CloudsGroup count={25} />
      <ambientLight args={[0xffffff, 1]} />
    </>
  );
};
