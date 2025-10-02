import type { NextConfig } from 'next';

export default {
  reactStrictMode: true,
  typedRoutes: true,
  turbopack: {
    rules: {
      '*.txt': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
} satisfies NextConfig;
