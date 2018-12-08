const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

/**
 *
 * @param relativePath
 * @returns {string}
 */
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: 'production',
  entry: {
    bundle: ['./src/index.js'],
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'm3common',
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        include: resolveApp('src'),
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        include: resolveApp('src'),
        options: {
          cacheDirectory: true,
          // Save disk space when time isn't as important
          cacheCompression: true,
          compact: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
