const devMode = process.env.NODE_ENV !== 'production'

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
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html'
    })
  ],
  stats: 'normal'
};
