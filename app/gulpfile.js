const gulp = require('gulp'),
  gulpif = require('gulp-if'),
  sourcemaps = require('gulp-sourcemaps'),

  pug = require('gulp-pug'),


  sass = require('gulp-sass')(require('sass')),
  postcss = require('gulp-postcss'),

  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  include = require('gulp-file-include'),

  del = require('del'),
  bs = require('browser-sync'),

  { path, configs } = require('./config.js');


class Tasks {
  static php() {
    return gulp.src(path.src.php)
      .pipe(gulp.dest(path.build.root))
  }

  static pug_php() {
    function renameToPhp(path) {
      path.extname = ".php";
    }
    return gulp.src(path.src.pug)
      .pipe(pug())
      .pipe(rename(renameToPhp))
      .pipe(gulp.dest(path.build.root))
  }

  static pug_html() {
    return gulp.src(path.src.pug)
      .pipe(pug())
      .pipe(gulp.dest(path.build.root))
  }

  static styles() {
    return gulp.src(path.src.scss)
      .pipe(gulpif(configs.global.isDev, sourcemaps.init()))
      .pipe(sass())
      .pipe(gulpif(configs.global.isDev, postcss(configs.postcss.dev())))
      .pipe(gulpif(configs.global.isProd, postcss(configs.postcss.prod())))
      .pipe(concat('style.css'))
      .pipe(gulpif(configs.global.isDev, sourcemaps.write()))
      .pipe(gulp.dest(path.build.css))
  }

  static js() {
    return gulp.src(path.src.js)
      .pipe(include())
      .pipe(concat('main.js'))
      .pipe(gulp.dest(path.build.js));
  }


  static assets() {
    return gulp.src(path.src.assets, { allowEmpty: true })
      .pipe(gulp.dest(path.build.assets));
  }

}
function clear() {
  return del(path.clear);
}

function clearAssets() {
  del(path.build.assets);
}

function browserSync() {
  bs.init({
    server: path.distFolder,
    port: 3000,
    notify: false
  })
}
function browserSyncPHP() {
  bs.init({
    proxy: "http://php:80",
    port: 3000,
    notify: false
  })
}

function watchFiles() {
  gulp.watch(path.watch.pug, gulp.series(Tasks.pug_html, Tasks.styles)).on('change', bs.reload);
  gulp.watch(path.watch.styles, Tasks.styles).on('change', bs.reload);
  gulp.watch(path.watch.js, Tasks.js).on('change', bs.reload);
  gulp.watch(path.watch.assets, gulp.series(clearAssets, Tasks.assets)).on('add', bs.reload).on('unlink', bs.reload);
}

function watchFilesPHP() {
  gulp.watch(path.watch.pug, gulp.series(Tasks.pug_php, Tasks.styles)).on('change', bs.reload);
  gulp.watch(path.watch.php, gulp.series(Tasks.php, Tasks.pug_php, Tasks.styles)).on('change', bs.reload);
  gulp.watch(path.watch.styles, Tasks.styles).on('change', bs.reload);
  gulp.watch(path.watch.js, Tasks.js).on('change', bs.reload);
  gulp.watch(path.watch.assets, gulp.series(clearAssets, Tasks.assets)).on('add', bs.reload).on('unlink', bs.reload);
}

const build = gulp.series(clear, Tasks.pug_html, Tasks.styles, Tasks.js, Tasks.assets);
const buildPHP = gulp.series(clear, Tasks.pug_php, Tasks.php, Tasks.styles, Tasks.js, Tasks.assets);
const serve = gulp.parallel(watchFiles, browserSync);
const servePHP = gulp.parallel(watchFilesPHP, browserSyncPHP);

exports.build = build;
exports.buildPHP = buildPHP;
exports.serve = gulp.series(build, serve);
exports.servePHP = gulp.series(buildPHP, servePHP);
exports.clear = clear;
exports.watch = gulp.series(build, watchFiles);
exports.watchPHP = gulp.series(buildPHP, watchFilesPHP);
