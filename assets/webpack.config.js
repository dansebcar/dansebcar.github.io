const path = require("path");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.scss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
          },
        ]
      }
    ],
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "src/utils/"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCSSExtractPlugin(),
  ],
};