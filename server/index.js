var webpack               = require('webpack')
var webpackDevMiddleware  = require('webpack-dev-middleware')
var webpackHotMiddleware  = require('webpack-hot-middleware')
var express               = require('express')
var bodyParser            = require('body-parser')

var webpackConfig         = require('../webpack.config')
var auth                  = require('./auth')
var addRoutes             = require('./addRoutes')
var db                    = require('./db')

var app = new express()
var port = process.env.PORT || 8000

// FRONT_END

var compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// BACK_END

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

auth.addAuth(app)
addRoutes(app)
// db.connect()

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
