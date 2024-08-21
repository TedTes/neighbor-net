const { merge } = require("webpack-merge");
const common = require("./webpack.config.common");

module.exports = merge(common, {
  entry: path.resolve(__dirname, "../src/client/index.tsx"),
  //mode: "development",
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
