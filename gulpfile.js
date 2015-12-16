var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var browsersync = require('browser-sync');
var browserify = require('browserify');

gulp.task("sass", function() {
  gulp.src("./src/sass/**/*sass")
    .pipe(plugins.sass({
      outputStyle: "expanded"
    }))
    .pipe(gulp.dest("./dest/css"))
    .pipe(browsersync.stream());
});

gulp.task('slim', function(){
  gulp.src("./src/**/*.slim")
    .pipe(plugins.slim({
      pretty: true
    }))
    .pipe(gulp.dest("./dest"))
    .pipe(browsersync.stream());
});

// http://qiita.com/seanchas_t/items/96fbb63e5fe36f94a42e
// gulp-browserifyというgulpでBrowserifyを扱うプラグインもあるが、gulp公式的には非推奨らしく、browserifyを直接使ったほうが良さそう。
gulp.task('concat', function() {
  // Single entry point to browserify 
  browserify({
    entries: ['./src/js/main.js'],
    debug : !gulp.env.production
  }).bundle()
  .pipe(source('all.js'))
  .pipe(gulp.dest("./dest/js"))
  .pipe(browsersync.stream());
});

// BrowserSync
gulp.task('browsersync', function() {
  browsersync.init(null, {
    server: {
      baseDir: './dest',
      ghostMode: true,
      online: false
    }
  });
});

// Tasks
gulp.task('reload', function() {
  browsersync.reload();
});

// Watch
gulp.task('default', ['browsersync'], function() {
  gulp.watch("./src/sass/**/*.sass", ['sass']);
  gulp.watch("./src/js/**/*.js", ['concat']);
  gulp.watch("./src/**/*.slim", ['slim']);
  gulp.watch('./src/*.html', ['reload']);
});

//Browsersync + Gulp.js
//https://www.browsersync.io/docs/gulp/