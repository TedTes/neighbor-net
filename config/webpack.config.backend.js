const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");
const path = require("path");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return merge(common, {
    mode: isProduction ? "production" : "development",
    name: "server",
    entry: path.resolve(__dirname, "../backend/src/server.ts"),
    target: "node",
    devtool: isProduction ? "source-map" : "inline-source-map",
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
};
