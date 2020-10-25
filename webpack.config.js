/**
 * Webpack configuration
 *
 * @author Codex Team
 * @copyright Khaydarov Murod
 */
'use strict';

module.exports = (env, argv) => {
  const path = require('path');
  const pkg = require('./package.json');

  /**
   * Environment
   *
   * @type {any}
   */
  const NODE_ENV = argv.mode || 'development';
  const VERSION = process.env.VERSION || pkg.version;

  /**
   * Plugins for bundle
   *
   * @type {webpack}
   */
  const webpack = require('webpack');


    return  {
    entry: [ './src/index.js' ],
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
            {
                loader: 'babel-loader',
                query: {
                presets: [ '@babel/preset-env' ],
                },
            },
            ]
        },
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                plugins: [
                    require('postcss-nested-ancestors'),
                    require('postcss-nested')
                ]
                }
            }
            ]
        }]
    },
     plugins: [
      /** Pass variables into modules */
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        VERSION: JSON.stringify(VERSION),
      }),

      new webpack.BannerPlugin({
        banner: `SimpleImage tool\n\n@version ${VERSION}\n\n@package https://github.com/editor-js/simple-image\n@licence MIT\n@author CodeX <https://codex.so>, SoSIE <https://sosie.sos-productions.com>`,
      }),
     ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
        library: 'SimpleImage',
        libraryTarget: 'umd'
    }
  };
};


