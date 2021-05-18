const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins([
  [withImages],
  {
    future: {
      webpack5: true
    },
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
