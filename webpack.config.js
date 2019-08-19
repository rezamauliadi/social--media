const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "web",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  devServer: {
    port: 9000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve("src")
    },
    extensions: ["*", ".js"]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
