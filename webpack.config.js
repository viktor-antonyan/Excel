const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => !isProd ? `bundle.${ext}` : `bundle.[hash].${ext}`


const jsLoader = () => {
  const loaders = ['babel-loader']
  if (isDev) loaders.push('eslint-loader')
  return loaders
}
module.exports = {
  context: path.resolve('src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // {
          //   loader: MiniCssExtractPlugin,
          //   options: {
          //     hml: isDev,
          //     reloadAll: true
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoader()
      }
    ],
  },
}
