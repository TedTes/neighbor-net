const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    name: "auth-service",
    entry: path.resolve(__dirname, "./src/index.ts"),
    target: "node",
    // devtool: isProduction ? "source-map" : "inline-source-map",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "auth-service.bundle.js",
    },
    externals: {
      mongodb: "commonjs mongodb",
      bcrypt: "commonjs bcrypt",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
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
