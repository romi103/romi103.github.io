var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');;

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('hello', function() {
    console.log("hello hi");
});


gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/*.js', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
});