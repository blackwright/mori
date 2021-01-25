const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins([
  [withImages],
  {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/mori',
          permanent: true
        }
      ];
    }
  }
]);
