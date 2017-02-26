const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const PATHS = {
  app: './src/main/web/app/index.js',
  html: './src/main/web/app/index.html',
  favicon: './src/main/web/app/favicon.ico',
  src: path.resolve(__dirname, 'src/main/web/app'),
  dist: path.resolve(__dirname, 'build/dist'),
  routes: path.resolve(__dirname, 'src/main/web/app/routes'),
  assets: path.resolve(__dirname, 'src/main/web/app/assets'),
  react: path.resolve(__dirname, 'node_modules/react')
}

// base URL name
const BASENAME = 'sample-app'

// Webpack dev server port
const DEV_SERVER_PORT = 4000

// host address
const HOST = 'localhost'

// Enable production source maps
const ENABLE_PROD_SRC_MAPS = false

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.html,
  filename: 'index.html',
  inject: 'body',
  favicon: PATHS.favicon
})

/**
 * Webpack configuration.
 *
 * @param env arguments passed in on the command line.
 */
module.exports = env => {
  const webpackConfig = {
    // The base directory (absolute path) for resolving the 'entry' option. If 'output.pathinfo' is set, the included
    // pathinfo is shortened to this directory.
    context: __dirname,

    // for production treat first error as a hard error instead of tolerating it
    bail: env.prod
  }

  if (env.dev) {
    // Source maps enable breakpoints and stepping through the original ES6 code.
    webpackConfig.devtool = 'inline-source-map'
  } else if (ENABLE_PROD_SRC_MAPS) {
    // A source map in production enables errors to be reported with the real file name and line number logged in the
    // browser console. Set ENABLE_PROD_SRC_MAPS to false to disable source maps completely from production loads.
    webpackConfig.devtool = 'cheap-module-source-map'
  }

  // the entry points of the bundle
  webpackConfig.entry = {
    // our top level code and everything that doesn't slot into other chunks
    js: ['babel-polyfill', PATHS.app],

    // the pages that make up our application
    route: PATHS.routes + '/routes.js',

    // vendor code that is likely to be used everywhere
    vendor: [
      'material-ui',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-tap-event-plugin',
      'redux'
    ]
  }

  if (env.dev) {
    webpackConfig.entry.hmr = [
      'webpack-dev-server/client?http://' + HOST + ':' + DEV_SERVER_PORT,
      'webpack/hot/only-dev-server'
    ]
  }

  // Options affecting the output of the compilation. They tell Webpack how to write the compiled files to disk.
  webpackConfig.output = {
    // the output directory as an absolute path
    path: PATHS.dist,

    // include module information comments, not for production
    pathinfo: !env.prod
  }

  if (env.dev) {
    webpackConfig.output.filename = '[name].js'
    webpackConfig.output.chunkFilename = '[id].js'
  } else {
    webpackConfig.output.filename = '[name].[hash].js'
    webpackConfig.output.chunkFilename = '[id].[chunkhash].js'
  }

  // specifies the public URL address of the output files when referenced in a browser
  if (env.dev) {
    webpackConfig.output.publicPath = `http://${HOST}:${DEV_SERVER_PORT}/${BASENAME}/`
  } else {
    webpackConfig.output.publicPath = `/${BASENAME}/`
  }

  webpackConfig.resolve = {
    // Files specified with an relative path are resolved by looking in these directories (like the PATH env variable)
    modules: [path.join(__dirname, '.'), './node_modules'],
    alias: {
      assets: PATHS.assets,
      react: PATHS.react
    },
    // When looking for index file in a folder, look for these extensions:
    extensions: ['.js', '.jsx']
  }

  // Enzyme config ... for testing
  webpackConfig.externals = {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': 'true',
    'react/lib/ReactContext': 'true'
  }

  // options affecting modules, where a module is any object that contributes the creation of build artifacts
  webpackConfig.module = {
    rules: [
      {
        // the file to run the loaders against (*.js and *.jsx)
        test: /(\.js|\.jsx)$/,

        // stay out of the node_modules directory
        exclude: /node_modules/,

        // fires right to left, 1st lint JS, then babel transpiles to smooth out the ES6 for varied browser support
        use: [
          {
            loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-2'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        // CSS files
        test: /\.css$/,

        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      // url-loader works like the file-loader, it returns a Data URL if the file is smaller than a limit (bytes).
      // Removing limit query defaults to no limit. If the file is greater than the limit the file-loader is used.
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?.*)?$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(eot|ttf|wav|mp3)(\?.*)?$/,
        loader: 'file-loader'
      }
    ]
  }

  webpackConfig.plugins = [
    // tell Webpack we want hot reloading ... doesn't work the same in Webpack 2
    // HMR still works without this line, entire page reloads
    new webpack.HotModuleReplacementPlugin(),

    // helps us manage the index.html and gets it into the distribution directory
    HtmlWebpackPluginConfig,

    // Vendor code can have modules in common. This identifies common modules and puts them into a commons chunk.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    // Moves every styling chunk into a separate CSS file
    new ExtractTextPlugin({
      filename: env.dev ? '[name].css' : '[name].[chunkhash].style.css',
      disable: false,
      allChunks: true
    }),

    // Get module name resolved on browser console instead of the default id number
    new webpack.NamedModulesPlugin(),

    // Anywhere in the runtime code, use `process.env.NODE_ENV` to determine runtime build.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': env.prod ? '"production"' : '"development"'
    })
  ]

  if (env.prod) {
    webpackConfig.plugins.push(
      new UglifyJSPlugin()
    )
  }

  webpackConfig.devServer = {
    hot: true,
    contentBase: PATHS.dist,
    port: DEV_SERVER_PORT,
    historyApiFallback: {
      index: `/${BASENAME}/`
    }
  }

  return webpackConfig}
