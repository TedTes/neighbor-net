// import path from "path";
// import { Configuration } from "webpack";
// import nodeExternals from "webpack-node-externals";
const path = require("path");

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
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

module.exports = config;
