/**
 * 
 * Config to build a React app with es2015.
 * 
 * @author jingjiejiang
 * @history May 2, 2022
 * 
 */
const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './app/index.jsx', // main file that loads the app
  devServer: {
    hot: true,
    static: path.resolve(__dirname, 'dist'),
    port: 3001
  },
  output: { 
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js',
    publicPath: '/assets/' 
  },
  module: {
    rules: [
      {
        use: [
          'babel-loader',
        ]
      }
    ]
  },
};