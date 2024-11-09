const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    camelCase: "./src/camelCase.js",
  },
  output: {
    filename: "[name].bundle.js", // [name] is a placeholder for the entries
    path: path.resolve(__dirname, "dist"),
  },
  // add some css loaders/preprocessors
  module: {
    // match files that end with ".sass" and use the loaders to preprocess them into the output file
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Albert's Toolkit",
      filename: "index.html",
      template: "public/template.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000, // server on port 3000
    open: true, // open the web page after starting the dev server
    hot: true,
    compress: true,
  },
};
