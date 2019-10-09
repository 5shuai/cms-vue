//配置文件，通过Node中的模块操作，向外暴露配置对象
const path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    //命令参数的配置项
    open: true,
    hot: true,
    contentBase: 'src'
  },
  plugins: [//配置插件
      new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=330751&name=[hash:8]-[name].[ext]‬'},
      {test: /\.ts$/, use: 'ts-loader'},
      {test: /\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'},
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
      {test: /\.vue$/, use: 'vue-loader'}
    ]
  }
};