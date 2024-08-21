const { merge } = require("webpack-merge");
const common = require("./webpack.config.common");
const path = require("path");
module.exports = merge(common, {
  entry: path.resolve(__dirname, "../src/client/index.tsx"),
  output: {
    filename: "client.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map",
});
