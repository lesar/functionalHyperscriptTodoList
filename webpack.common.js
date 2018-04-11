/*
 * vedi https://github.com/petehunt/webpack-howto
 *
 */
var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
/*
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});
*/
module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.ts'), //entrata da compilare. Se ne possono aggiungere molte creando vari profili
  },
  output: {
    filename: 'bundle.js', //file di output dove mettere il compilato
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [  
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: "[name].css", //"styles.css"
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: 'Prima prova',
      template: 'src/index.ejs'
    }),
    new webpack.DefinePlugin({
      'process.env' : {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
	],
  module: {
    rules: [// rules was named loaders in webpack 1 or 2; but is be renamed "rules" in now
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          transpileOnly: false
        }
      },
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
				enforce: 'pre',
        loader: 'source-map-loader'
      },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
			//{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      { test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }

    ]
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'] // note if using webpack 1 you'd also need a '' in the array as well
  }
};
