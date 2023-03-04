const path = require('path');

// css extraction and minification
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const HtmlWebpackPlugin = require('html-webpack-plugin');

// clean out build dir in-between builds
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    entry: {
      'main': [
        path.join(__dirname, 'src', 'index.js'),
        path.join(__dirname, 'src', 'styles', 'index.scss'),
      ]
    },
    output: {
      // filename: './js/build/[name].min.[fullhash].js',
      path: path.join(__dirname, 'dist'),
      filename: 'js/' + '[name].min.js',
    },
    externals: {
      jquery: 'jQuery'
    },
    module: {
      rules: [
        // js babelization
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // sass compilation
        {
          test: /\.(sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        // loader for webfonts (only required if loading custom fonts)
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            // filename: './dist/css/font/[name][ext]',
            filename: 'css/font/[name][ext]',
          }
        },

        // loader for images and icons (only required if css references image files)
        {
          test: /\.(png|jpg|gif|webp)$/,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext]',
          }
        },
      ]
    },
    plugins: [
      // clear out build directories on each build
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.join(__dirname, 'dist', 'js'),
          path.join(__dirname, 'dist', 'css'),
        ]
      }),
      // css extraction into dedicated file
      new MiniCssExtractPlugin({
        filename: 'css/main.min.css'
      }),

      new HtmlWebpackPlugin({
        title: 'webpack Boilerplate',
        // favicon: paths.src + '/images/favicon.png',
        template: path.join(__dirname, 'src', 'template.html'), // template file
        filename: './../index.html', // output file
        inject: "body"
      })
    ],
    optimization: {
      // minification - only performed when mode = production
      minimizer: [
        // js minification - special syntax enabling webpack 5 default terser-webpack-plugin 
        `...`,
        // css minification
        new CssMinimizerPlugin(),
      ],
      moduleIds: 'deterministic',
    },
  }
];
