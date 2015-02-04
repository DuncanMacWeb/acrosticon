var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var to5 = require('gulp-6to5');
var shell = require('gulp-shell')


gulp.task('source', function () {
    return gulp.src('lib/**/*.js')
      .pipe(sourcemaps.init())
        .pipe(to5())
        .pipe(gulp.dest('dist'));
});
 
gulp.task('templates', function() {
  gulp.src('views/**/*.jade')
    .pipe(shell([
      'jadum views/** -o .bin'
    ], {
      templateData: {
        f: function (s) {
          return s;
        }
      }
    }));
});

gulp.task('default', ['templates', 'source']);
