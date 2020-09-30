const gulp = require('gulp');
const clean = require('gulp-clean');
const htmlmin = require('gulp-html-minifier-terser');
const rename = require('gulp-rename');

// Clean output directory
gulp.task('clean', function () {
    return gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task('minify-ejs', function () {
    return gulp
        .src(['./www/**/*.html'])
        .pipe(
            htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                // collapseBooleanAttributes: true,
                // removeAttributeQuotes: true,
                // removeEmptyAttributes: true,
                minifyJS: true,
                minifyCSS: true,
            })
        )
        .pipe(gulp.dest('./dist/views'));
});

gulp.task('copy-folder', function () {
    return gulp.src(['./assets/**/*'], { base: '.' }).pipe(gulp.dest('dist'));
});

gulp.task('copy-file', function () {
    return gulp
        .src(['./pm2panel.js', './package.json', './package-lock.json', '.env.example'], {
            dot: true,
        })
        .pipe(gulp.dest('dist'));
});

gulp.task('create-folder', function () {
    return gulp.src('*.*', { read: false }).pipe(gulp.dest('./dist/uploads/temp'));
});

gulp.task('copy-rename-file', function () {
    return gulp.src('web.prod.config').pipe(rename('web.config')).pipe(gulp.dest('./dist'));
});

// Gulp task to minify all files
gulp.task('default', gulp.series('clean', 'minify-ejs', 'copy-folder', 'copy-file'));
