const path = require('path');
const webpack = require('webpack');
const apps = require('./apps');

const isProduction = process.env.NODE_ENV === 'production';
const entries = {
};
apps.forEach((app) => {
  entries[app] = [
    path.join(__dirname, '/src/apps/'+app),
  ];
  !isProduction && entries[app].unshift(
    'webpack-hot-middleware/client?reload=true',
  );
});
console.log(entries);

module.exports = {
  devtool: 'eval',
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/static',
  },
  plugins: isProduction ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.webpack.js', '.web.js'],
    modules: [
      path.resolve(__dirname, './node_modules'),
    ],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
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
