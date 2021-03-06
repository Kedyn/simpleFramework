var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = ['src/*.html','src/assets/*'];

gulp.task("copy-html-and-assets", function () {
    return gulp.src(paths)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html-and-assets"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify, { targe: 'es5' })
        .bundle()
        .pipe(source('js/SimpleGame.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist"));
});
