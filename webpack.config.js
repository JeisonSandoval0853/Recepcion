const path = require('path')

module.exports = {
  watch: true,
  mode: 'development',
  entry: {
    home: './web/src/pages/home.js',
    login: './web/src/pages/LoginPage.js'
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }
  ]
  },
  plugins: []
};
