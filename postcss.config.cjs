const postcssMixins = require('postcss-mixins');
const postcssPresetEnv = require('postcss-preset-env');

const config = {
  plugins: [
    postcssPresetEnv({
      stage: 0,
      browsers: 'last 2 versions',
      enableClientSidePolyfills: true,
    }),
    postcssMixins({
      mixinsFiles: 'src/styles/mixins.pcss'
    })
  ]
};

module.exports = config;
