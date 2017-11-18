const path = require('path');
const os = require('os');

module.exports = {
  context: path.join(__dirname),
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.html'],
    modules:    [
      path.join(__dirname, '/app/static'),
      'node_modules',
    ],
  },
  entry:   {
    init: path.join(__dirname, '/app/static/init.jsx'),
  },
  output:  {
    path: path.join(__dirname, '/app/build'),

    // libraryTarget: 'amd',
    filename: 'init.js',
  },
  devtool: '#inline-source-map',
  module:  {
    rules: [{
      test:    /\.js|.jsx$/,
      exclude: /node_modules/,
      use:     [{
        loader:  'babel-loader',
        options: {
          cacheDirectory: os.tmpdir(),
        },
      }],
    }, {
      test:    /\.json$/,
      exclude: /node_modules/,
      use:     [{
        loader: 'raw-loader',
      }],
    }],
  },
};
