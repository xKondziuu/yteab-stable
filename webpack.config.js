const webpack = require('webpack')
const path = require('path')


// Konfiguracja globalna
var globalConfig = {
  mode: 'production',
  module: {
    rules: [
      {  // obsługa css i scss
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
        include: path.resolve(__dirname, 'src')
      },
      {  // obsługa typescript
        test: /\.(ts|tsx)?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        exclude: /node_modules/
      }
    ]
  },
  target: 'webworker',
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css']
  },
  plugins: [
    new webpack.DefinePlugin({  // ustawienie trybu production
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  stats: {  // ustawienia outputu w konsoli
    colors: true,
    children: false,
    chunks: false,
    modules: true
  },
  optimization: {
    minimize: true  // kompresja plików wyjściowych
  }
}


// Konfiguracja ./src/inject/*
var injectConfig = Object.assign({}, globalConfig, {
  name: "inject",
  entry: "./src/inject/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist/.top/inject'),
    filename: "all.js"
  },
})


// Konfiguracja ./src/popup/*
var popupConfig = Object.assign({}, globalConfig,{
  name: "popup",
  entry: "./src/popup/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist/.top/popup'),
    filename: "all.js"
  },
})


// Eksport konfiguracji
module.exports = [
  injectConfig,
  popupConfig
]
