const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/store.js',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'm3core',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
