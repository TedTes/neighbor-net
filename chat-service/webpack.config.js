const path = require("path");

console.log("this is dirname");
console.log(__dirname);

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    name: "server",
    entry: path.resolve(__dirname, "./src/server.ts"),
    target: "node",
    devtool: isProduction ? "source-map" : "inline-source-map",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "server.bundle.js",
    },
    externals: {
      mongodb: "commonjs mongodb",
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
  };
};
