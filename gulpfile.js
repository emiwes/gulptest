/* jshint esversion: 6 */
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const useref = require('gulp-useref');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('default', function(callback) {
    runSequence(['sass', 'libs', 'scripts', 'browserSync', 'watch'], callback);
});

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['sass', 'libs', 'scripts', 'useref', 'images'], callback);
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('libs', function() {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('app/js/libs'));
});

gulp.task('scripts', function() {
  gulp.src(['app/js/**/*.js','!app/js/**/*.min*'])
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass()) // Using gulp-sass
        .pipe(cleanCSS()) // minifying all css
        .pipe(concat('stylesheet.css')) //saves all css to one file that is watched in useref
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browserSync', 'sass', 'scripts'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Other watchers

    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', ['scripts']);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
});
