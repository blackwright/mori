import * as React from 'react';
import { StarsPointCloud } from './StarsPointCloud';
import { CloudsGroup } from './CloudsGroup';

export const Scene: React.FC = () => {
  return (
    <React.Suspense fallback={null}>
      <StarsPointCloud count={2_000} />
      <CloudsGroup count={50} />
      <ambientLight args={[0xffffff, 1]} />
    </React.Suspense>
  );
};
