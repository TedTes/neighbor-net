// import path from "path";
// import nodeExternals from "webpack-node-externals";
const path = require("path");
const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();

const config = {
  name: "server",
  entry: path.resolve(__dirname, "./server/server.ts"),
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    //  path: path.join(CURRENT_WORKING_DIR, "/dist/"),
    filename: "server.bundle.js",
    publicPath: "/dist/",
    //libraryTarget: "commonjs2",
  },
  // externals: [nodeExternals()],
  externals: {
    mongodb: "commonjs mongodb",
    bcrypt: "commonjs bcrypt",
    // add other modules if necessary
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^node-gyp$|^aws-sdk$|^mock-aws-s3$|^nock$/,
    }),
  ],
};

module.exports = config;
