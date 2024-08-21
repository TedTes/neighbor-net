const { merge } = require("webpack-merge");
const common = require("./webpack.config.common");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  entry: path.resolve(__dirname, "../src/client/index.tsx"),
  output: {
    filename: "client.bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "/static/images/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/client", "index.html"),
      filename: "index.html",
    }),
  ],
  devtool: "source-map",
});
