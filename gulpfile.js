const { src, dest, parallel, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const concat = require("gulp-concat");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    ghostMode: { clicks: false },
    notify: false,
    online: true,
  });
}

function stylesIndex() {
  return src("scss/index.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["> 1%", "last 2 versions", "not ie <= 8"],
        grid: true,
      })
    )
    .pipe(cleancss())
    .pipe(rename("index.css"))
    .pipe(dest("./"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(["js/**/*.js", "js/*.min.js"])
    .pipe(
      webpackStream(
        {
          mode: "production",
          performance: { hints: false },
          module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["babel-plugin-root-import"],
                  },
                },
              },
            ],
          },
          optimization: {
            minimize: true,
            minimizer: [
              new TerserPlugin({
                terserOptions: { format: { comments: false } },
                extractComments: false,
              }),
            ],
          },
        },
        webpack
      )
    )
    .pipe(concat("index.min.js"))
    .pipe(dest("./"))
    .pipe(browserSync.stream());
}

function startwatch() {
  watch("index.html").on("change", browserSync.reload);
  watch(["js/**/*.js", "js/**/*.min.js"]).on("change", scripts); // Добавлено отслеживание JS файлов и вызов задачи scripts
  watch("scss/**/*.scss", stylesIndex);
}

exports.default = parallel(stylesIndex, scripts, browsersync, startwatch);
