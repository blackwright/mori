import type { Metadata } from 'next';
import { LoveDeathAndRobots } from './client/LoveDeathAndRobots';

export const metadata: Metadata = {
  title: '❤️💀+🤖',
};

export default function LoveDeathAndRobotsPage() {
  return <LoveDeathAndRobots />;
}
