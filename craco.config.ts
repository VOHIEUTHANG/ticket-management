import path from 'path';

module.exports = {
  webpack: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/view/styles'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@routers': path.resolve(__dirname, 'src/routers'),
      '@assets': path.resolve(__dirname, 'src/shared/assets'),
      '@interface': path.resolve(__dirname, 'src/types'),
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@view': path.resolve(__dirname, 'src/view'),
    },
  },
};
