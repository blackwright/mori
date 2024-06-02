import * as React from 'react';
import { CloudsGroup } from './CloudsGroup';
import { StarsPointCloud } from './StarsPointCloud';

export const Scene: React.FC = () => {
  return (
    <React.Suspense fallback={null}>
      <StarsPointCloud count={2_000} />
      <CloudsGroup count={25} />
      <ambientLight args={[0xffffff, 1]} />
    </React.Suspense>
  );
};
