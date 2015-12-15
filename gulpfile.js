var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var bs = require('browser-sync');
var browserify = require('browserify');

gulp.task("sass", function() {
  gulp.src("./src/sass/**/*sass")
    .pipe(plugins.sass({
      outputStyle: "expanded"
    }))
    .pipe(gulp.dest("./dest/css"))
    .pipe(bs.stream());
});

gulp.task('slim', function(){
  gulp.src("./src/**/*.slim")
    .pipe(plugins.slim({
      pretty: true
    }))
    .pipe(gulp.dest("./dest"))
    .pipe(bs.stream());
});

// http://qiita.com/seanchas_t/items/96fbb63e5fe36f94a42e
// gulp-browserifyというgulpでBrowserifyを扱うプラグインもあるが、gulp公式的には非推奨らしく、browserifyを直接使ったほうが良さそう。
gulp.task('concat', function() {
  // Single entry point to browserify 
  browserify({
    entries: ['./src/js/main.js'],
    debug : !gulp.env.production
  })
  .bundle()
  //.pipe(plugins.rename('all.js'))
  .pipe(source('all.js'))
  .pipe(gulp.dest("./dest/js"))
  .pipe(bs.stream());
});

// BrowserSync
gulp.task('bs', function() {
  bs.init(null, {
    server: {
      baseDir: './dest',
      ghostMode: false
    }
  });
});

// Tasks
gulp.task('reload', function() {
  bs.reload();
});

// Watch
gulp.task('default', ['bs'], function() {
  gulp.watch("./src/sass/**/*.sass", ['sass']);
  gulp.watch("./src/js/**/*.js", ['concat']);
  gulp.watch("./src/**/*.slim", ['slim']);
  gulp.watch('./src/*.html', ['reload']);
});

//Browsersync + Gulp.js
//https://www.browsersync.io/docs/gulp/