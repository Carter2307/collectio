const path = require('path')
const webpack = require('webpack')

//-----plugins-----//

/**
 * Optimisation engine
 */
const TerserPlugin = require('terser-webpack-plugin')

/**
 * Minimize image size
 */

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
/**
 * Un plugin webpack pour supprimer/nettoyer
 * votre ou vos dossiers de construction.
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

 /**
  * Copie des fichiers individuels ou des répertoires entiers,
  * qui existent déjà, dans le répertoire de construction
  */
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * Ce plugin extrait le CSS dans des fichiers séparés.
 * Il crée un fichier CSS par fichier JS contenant du CSS
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const IS_DEVELOPPEMENT = process.ENV === 'dev'

//Resolve directory
const dirApp = path.join(__dirname, '../app')
const dirImages = path.join(__dirname, '../images')
const dirShared = path.join(__dirname, '../shared')
const dirVideos = path.join(__dirname, '../videos')
const dirStyles = path.join(__dirname, '../styles')
const dirNode = 'node_modules'


module.exports = {

  entry: [path.join(dirApp, 'app.js'), path.join(dirStyles, 'main.scss')],

  //Simplifie l'utilisation des chemin -> path
  resolve: {
    modules: [dirApp, dirImages, dirShared, dirVideos, dirStyles, dirNode],
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPPEMENT,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './shared',
          to: '',
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

  //  new ImageMinimizerPlugin({
  //       minimizer: {
  //         implementation: ImageMinimizerPlugin.imageminMinify,
  //         options: {
  //           plugins: [
  //             ["gifsicle", { interlaced: true }],
  //             ["jpegtran", { progressive: true }],
  //             ["optipng", { optimizationLevel: 8 }],
  //           ],
  //         },
  //       },
  //     }),

    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      //JS
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },

      //CSS
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env"]
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
          },
        ],
      },

      //IMAGES
      {
        test: /\.(png|jpg|gif|jpe?g|svg|woff2?|fnt|webp|mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[hash].[ext]',
        }
      },

      // {
      //   test: /\.(jpe?g|png|gif|svg|webp)$/i,
      //   use: [
      //     {
      //       loader: ImageMinimizerPlugin.loader,
      //     },
      //   ],
      // },


    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
       extractComments: false,
    })],
  },
}
