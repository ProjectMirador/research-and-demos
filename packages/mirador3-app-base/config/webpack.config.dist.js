process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('./env');
const paths = require('./paths');

module.exports = {
  mode: 'production',
  entry: [paths.appDistIndexJs],
  output: {
    path: paths.appDist,
    filename: 'mirador.bundle.js',
    libraryTarget: 'umd',
    library: 'Mirador',
    libraryExport: 'default',
  },
  resolve: { extensions: ['.js'] },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader', // creates style nodes from JS strings
              'css-loader', // translates CSS into CommonJS
              'sass-loader', // compiles Sass to CSS, using Node Sass by default
            ],
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
};
