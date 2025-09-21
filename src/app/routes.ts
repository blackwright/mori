import type { Route } from 'next';

type RouteObject = {
  title: string;
  path: Route;
  img: string;
};

export const routes: RouteObject[] = [
  {
    title: 'Dune Ipsum',
    path: '/dune-ipsum',
    img: '/thumbnails/dune.png',
  },
  {
    title: 'Late',
    path: '/late',
    img: '/thumbnails/late.png',
  },
  {
    title: 'Mori',
    path: '/mori',
    img: '/thumbnails/mori.jpg',
  },
  {
    title: 'Rise',
    path: '/rise',
    img: '/thumbnails/rise.png',
  },
  {
    title: 'Pale Blue Dot',
    path: '/pale-blue-dot',
    img: '/thumbnails/pale.jpg',
  },
  {
    title: '❤️ 💀 + 🤖',
    path: '/ldar',
    img: '/thumbnails/ldar.png',
  },
];
