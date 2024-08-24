const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");
const path = require("path");

const config = merge(common, {
  name: "server",
  entry: path.resolve(__dirname, "../backend/server.ts"),
  target: "node",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "server.bundle.js",
    //publicPath: "/dist/",
  },
  externals: {
    mongodb: "commonjs mongodb",
    bcrypt: "commonjs bcrypt",
  },
});

module.exports = config;
