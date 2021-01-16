const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              '@babel/plugin-proposal-private-methods',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        include: path.join(__dirname, 'src'),
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              localIdentName: 'styles_[local]_[hash:base64:5]',
              sourceMap: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new BaseHrefWebpackPlugin({
      baseHref: '/',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './static'),
          to: path.resolve(__dirname, './dist'),
        },
      ],
    }),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      systemvars: true,
    }),
    new MomentLocalesPlugin(),
  ],
  stats: {
    children: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.sass'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true,
          mangle: true,
          cache: true,
          parallel: true,
          output: {
            comments: false,
          },
        },
        sourceMap: false,
      }),
    ],
  },
};
