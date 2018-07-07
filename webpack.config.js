const devMode = process.env.NODE_ENV !== 'production'
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

console.log('devMode: ', devMode);


module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    compress: true,
    port: 3000,
    inline: true
  },
  entry: {
    main: './src/main.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader?interpolate'
      },
      {
        test: /\.(glsl|vs|fs)$/,
        loader: 'shader-loader',
        options: {
          glsl: {
            chunkPath: path.resolve("/glsl/chunks")
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin([
      {from:'src/assets',to:'assets'}
    ])
  ],
  stats: 'normal'
};
