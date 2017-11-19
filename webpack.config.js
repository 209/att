const path = require('path');
const os = require('os');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    }, {
      test:   /\.scss|.css$/,
      loader: ExtractTextPlugin.extract({
        use:      [
          {
            loader:  'css-loader',
            options: {
              minimize:  false,
              sourceMap: true,
            },
          },
          {
            loader:  'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, 'node_modules'),
                // path.resolve(__dirname, 'img'),
              ],
            },
          },
        ],
        fallback: 'style-loader',
      }),
    }, {
      test: /\.svg$/,
      use:  [{
        loader: 'react-svg-loader',
      }],
    }],
  },
  plugins: [
    new ExtractTextPlugin({
      filename:  '[name].css',
      allChunks: true,
    }),
  ],
};
