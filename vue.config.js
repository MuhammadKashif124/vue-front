const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/css/sass/abstracts/_variables.scss";
          @import "@/assets/css/sass/abstracts/_colors.scss";
          @import "@/assets/css/sass/abstracts/_mixins.scss";
        `,
      },
    },
  },
  outputDir: "../../areariservata",
  assetsDir: "./assets/",

  pages: {
    index: {
      entry: "src/index.js",
      template: "public/index.html",
      filename: "index.html",
      title: "MyGuru - Area Riservata"
    },
  },

  devServer: {
    clientLogLevel: "warning",
    hot: true,
    contentBase: "dist",
    compress: true,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: "/",
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/,
    },
    proxy: {
      "^/api": {
        target: "http://localhost:9000/api",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  chainWebpack: (config) => {
    config.plugins.delete("prefetch-index"),
      config.module
        .rule("vue")
        .use("vue-loader")
        .tap((args) => {
          args.compilerOptions.whitespace = "preserve";
        });
  },

  productionSourceMap: false,
  assetsDir: "./assets/",

  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "src/assets/img", to: "assets/img" },
          { from: "src/assets/logos", to: "assets/logos" },
          { from: "src/assets/fonts", to: "assets/fonts" },
        ],
      }),
    ],
  },
  runtimeCompiler: true,
};
