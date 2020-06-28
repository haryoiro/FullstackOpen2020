const path = require('path');
const webpack = require('webpack');

const config = {
  entry: [
    '@babel/polyfill','./src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react'],
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
  },
  devtool: 'source-map'
}

module.exports = config