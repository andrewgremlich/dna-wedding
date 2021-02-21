module.exports = {
  plugins: [
    require("postcss-import"),
    require("autoprefixer"),
    require("postcss-nested"),
    require("postcss-preset-env"),
    require("cssnano"),
  ],
};
