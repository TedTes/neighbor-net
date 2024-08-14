import path from "path";
//import nodeExternals from "webpack-node-externals";
const CURRENT_WORKING_DIR = process.cwd();

export const config = {
  name: "server",
  entry: [path.join(CURRENT_WORKING_DIR, "./server/server.ts")],
  target: "node",
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist/"),
    filename: "server.bundle.js",
    publicPath: "/dist/",
    // libraryTarget: "commonjs2",
  },
  // externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
