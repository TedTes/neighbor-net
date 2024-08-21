const { merge } = require("webpack-merge");
const common = require("./webpack.config.common");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  entry: path.resolve(__dirname, "../src/client/index.tsx"),
  output: {
    filename: "client.bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
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
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // Add this line for React Fast Refresh
  ],
  devtool: "source-map",
});
