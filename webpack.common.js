// const devMode = process.env.NODE_ENV !== "production";
const { VueLoaderPlugin } = require('vue-loader')
const path = require("path");
const PugPlugin = require('pug-plugin');
const srcPath = path.resolve(__dirname, 'src')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index: './src/views/layouts/base.pug',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: ''
  },
  resolve: {
    alias: {
      Styles: path.join(__dirname, 'src/assets/scss'),
      Images: path.join(__dirname, 'src/assets/images/'),
      Fonts: path.join(__dirname, 'src/assets/fonts/'),
      '@': path.resolve(__dirname, 'src/')
    },
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options: {
          method: 'render'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {

                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash:12][ext][query]'
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          // output filename of fonts
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },
  plugins: [
    new PugPlugin({
      extractCss: {
        filename: 'css/[name].[contenthash].css',
      },
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${srcPath}/static`,
          to: 'static'
        }
      ],
    }),
    new VueLoaderPlugin()
  ]
};