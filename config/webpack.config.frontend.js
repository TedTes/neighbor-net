const { merge } = require("webpack-merge");
//const webpack = require("webpack");
const common = require("./webpack.config.common");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
//const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return merge(common, {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(__dirname, "../frontend/src/index.tsx"),
    output: {
      filename: "frontend.bundle.js",
      clean: true,
    },
    devServer: {
      static: { directory: path.resolve(__dirname, "../dist") },
      hot: true,
      historyApiFallback: true,
      port: 3001,
      proxy: [
        {
          context: ["/places/search"],
          target: "https://api.foursquare.com",
          changeOrigin: true,
          pathRewrite: { "^/places/search": "" },
        },
      ],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|jpg|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[hash].[ext]",
                outputPath: "/assets/images/",
              },
            },
          ],
        },
      ],
    },
    // resolve: {
    //   fallback: {
    //     os: require.resolve("os-browserify/browser"), // Polyfill for 'os' module
    //     process: require.resolve("process/browser"),
    //   },
    // },
    plugins: [
      new ReactRefreshWebpackPlugin(),
      //new NodePolyfillPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../frontend/public", "index.html"),
        filename: "index.html",
      }),

      // new webpack.ProvidePlugin({
      //   process: "process/browser", // Automatically provide the process object
      // }),
    ],
    devtool: "source-map",
  });
};
