var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var bs = require('browser-sync');

gulp.task("sass", function() {
  gulp.src("./sass/**/*sass")
    .pipe(plugins.sass({
      outputStyle: "expanded"
    }))
    .pipe(gulp.dest("./public/css"))
    .pipe(bs.stream());
});

gulp.task('slim', function(){
  gulp.src("./slim/**/*.slim")
    .pipe(plugins.slim({
      pretty: true
    }))
    .pipe(gulp.dest("./public"))
    .pipe(bs.stream());
});

// BrowserSync
gulp.task('bs', function() {
  bs.init(null, {
    server: {
      baseDir: './public'
    }
  });
  gulp.watch("./sass/**/*.sass", ['sass']);
  gulp.watch("./slim/**/*.slim", ['slim']);
});

// Tasks
gulp.task('reload', function() {
  bs.reload();
});

// Watch
gulp.task('default', ['bs'], function() {
  gulp.watch('./public/*.html', ['reload']);
});

//Browsersync + Gulp.js
//https://www.browsersync.io/docs/gulp/