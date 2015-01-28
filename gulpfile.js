var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var to5 = require('gulp-6to5');

gulp.task('default', function () {
    return gulp.src('lib/**/*.js')
    	.pipe(sourcemaps.init())
        .pipe(to5())
        .pipe(gulp.dest('dist'));
});
