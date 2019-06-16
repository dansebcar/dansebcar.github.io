const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
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
            utils: path.resolve(__dirname, "src/utils/"),
        },
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin(),
    ],
};
