---
title: Minimal Vue & Webpack
date: 2018-12-03
categories: tutorial
---

# Integrate Vue, Webpack & Sass into an existing project with minimal effort

I love Vue; it's a brilliant, approachable and performant framework. With around 20 lines of config, you can enjoy the convenience of single file components integrated with no unnecessary extra CLIs.

To follow along with some examples, feel free to check out my [Jira web interface](https://github.com/dansebcar/dict-cc/) and [Dictionary](https://github.com/dansebcar/dict-cc/).

## Installation

If you don't have Node yet, I recommend [nvm](https://github.com/creationix/nvm). It's a great way to minimise the amount of time you spend with Node.

When you do, make a new directory in your project root (I usually call it assets) and enter it, then you can run `npm init -y` and `npm install css-loader mini-css-extract-plugin node-sass sass-loader vue-loader vue-template-compiler webpack webpack-cli`. You could

Make a few more directories in the `assets` folder: `src`, `src/components` and `dist`.

## Config

Create `webpack.config.js`. This will be read by node, so it needs to use the old-fashioned `require` syntax. You'll need to import three modules

```js
const path = require("path");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
```

Next you'll need the actual meat of the config.

```js
module.exports = {
  entry: "./src/index.js",
  output: {path: path.resolve(__dirname, "dist")},
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
  plugins: [new VueLoaderPlugin(), new MiniCSSExtractPlugin()],
};
```

In `package.json` add this to `scripts`: `"build": "webpack --watch"`. This way, you can run `npm run build` within the `assets` directory to watch your src directory and populate dist with the compiled files.

## Tying it all together

You'll need to include the files from dist in your

If you've done this within GH pages, you can add

```yaml
exclude:
  - assets/node_modules
```

to your `_config.yaml` to keep Jekyll from peering at the madness within (which slows it down).
