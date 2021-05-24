const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const del = require('del');
const plumber = require('gulp-plumber');
const server = require('browser-sync').create();

gulp.task('clean', () => {
    return del('build');
})

gulp.task('css', () => {
    return gulp.src('./src/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('build'))
    .pipe(server.stream())
})

gulp.task('html', (cb) => {
    gulp.src('./src/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(server.stream())
    cb()
})

gulp.task('server', () => {
    server.init({
        server: 'build',
        notify: false,
        open: true,
        cors: true,
        ui: false
    })
    gulp.watch('./src/**/*.scss', gulp.series('css'))
    gulp.watch('./src/**/*.html', gulp.series('html'))
})

gulp.task('copy', () => {
    return gulp.src('./src/assets/**/*.*')
    .pipe(gulp.dest('build/assets'))
})

gulp.task('start', gulp.series('clean', 'html', 'css', 'copy', 'server'))
gulp.task('build', gulp.series('clean', 'html', 'css', 'copy'))