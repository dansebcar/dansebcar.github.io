const path = require("path");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: {
    pokemon: "./src/pokemon/main.js",
    'skies-of-arcadia': "./src/skies-of-arcadia/main.js",
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
        ],
      },
      {
        test: /\.yaml$/,
        use: "js-yaml-loader",
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      sass: path.resolve(__dirname, "src/sass/"),
      utils: path.resolve(__dirname, "src/utils/"),
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCSSExtractPlugin(),
  ],
  externals: {
    vue: 'Vue',
  },
  watch: true,
  stats: 'minimal',
};
