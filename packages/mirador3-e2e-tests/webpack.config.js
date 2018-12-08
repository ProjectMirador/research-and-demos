const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const apps = require('./apps');

const appDirectory = fs.realpathSync(process.cwd());
/**
 *
 * @param relativePath
 * @returns {string}
 */
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const isProduction = process.env.NODE_ENV === 'production';
const entries = {
};
apps.forEach((app) => {
  entries[app] = [
    path.join(__dirname, `/src/apps/${app}`),
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
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.webpack.js', '.web.js'],
    modules: [
      path.resolve(__dirname, './node_modules'),
    ],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            include: resolveApp('src'),
            options: {
              cacheDirectory: true,
              cacheCompression: true,
              compact: true,
            },
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
