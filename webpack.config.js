var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        GOOGLE_MAPS_KEY: JSON.stringify(process.env.GOOGLE_MAPS_KEY),
        GEONAMES_API_USER: JSON.stringify(process.env.GEONAMES_API_USER),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: [ 'babel-loader' ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: [ 'style-loader', 'css-loader' ],
      include: __dirname
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loaders: [ 'file-loader?name=assets/[name].[ext]' ],
      include: __dirname,
    }]
  }
}
