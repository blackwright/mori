import { type Metadata } from 'next';
import { Cogitator } from './Cogitator';

export const metadata: Metadata = {
  title: 'Cogitator',
};

export default function CogitatorPage() {
  return <Cogitator />;
}
