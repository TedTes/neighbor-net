const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    name: "user-service",
    entry: path.resolve(__dirname, "./src/index.ts"),
    target: "node",
    // devtool: isProduction ? "source-map" : "inline-source-map",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "user-service.bundle.js",
    },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".proto"],
      alias: {
        "@common": path.resolve(__dirname, "../common"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: "html-loader",
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "../common/grpc/auth.proto", to: "./auth.proto" }],
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },
  };
};
