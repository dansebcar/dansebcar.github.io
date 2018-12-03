const path = require("path");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "production",
  entry: "./src/skies.js",
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
      sass: path.resolve(__dirname, "src/sass/"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCSSExtractPlugin(),
  ],
};
