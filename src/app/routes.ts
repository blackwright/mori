import type { Route } from 'next';

type RouteObject = {
  title: string;
  path: Route;
  img: string;
};

export const routes: RouteObject[] = [
  {
    title: 'Cogitator',
    path: '/cogitator',
    img: '/thumbnails/cogitator.webp',
  },
  {
    title: 'Dune Ipsum',
    path: '/dune-ipsum',
    img: '/thumbnails/dune.webp',
  },
  {
    title: 'Late',
    path: '/late',
    img: '/thumbnails/late.webp',
  },
  {
    title: 'Mori',
    path: '/mori',
    img: '/thumbnails/mori.webp',
  },
  {
    title: 'Rise',
    path: '/rise',
    img: '/thumbnails/rise.webp',
  },
  {
    title: 'Pale Blue Dot',
    path: '/pale-blue-dot',
    img: '/thumbnails/pale.webp',
  },
  {
    title: '❤️ 💀 + 🤖',
    path: '/ldar',
    img: '/thumbnails/ldar.webp',
  },
];
