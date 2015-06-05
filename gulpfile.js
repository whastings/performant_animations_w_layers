'use strict';

var autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    cssmin = require('gulp-cssmin'),
    fs = require('fs'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    template = require('gulp-template');

var isDist = process.argv[2] === 'dist',
    dest = isDist ? './dist' : './build';

gulp.task('build_copy', ['copy_images', 'copy_vendor']);

gulp.task('build_css', function() {
  var stream = gulp.src('./scss/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer({cascade: false}));

  if (isDist) {
    stream = stream.pipe(cssmin());
  }

  stream = stream.pipe(gulp.dest(dest));

  return stream;
});

gulp.task('build_index', function() {
  var slidesContent = fs.readFileSync(__dirname + '/slides.md');

  return gulp.src('./index.html')
    .pipe(template({slidesContent: slidesContent}))
    .pipe(gulp.dest(dest));
});

gulp.task('copy_images', function() {
  return gulp.src('./images/*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('copy_vendor', function() {
  return gulp.src('./remark.min.js')
    .pipe(gulp.dest(dest));
});

gulp.task('dev', function() {
  gulp.watch(['slides.md', 'index.html'], ['build_index']);
  gulp.watch('./scss/**/*.scss', ['build_css']);

  connect.server({port: 8000, root: dest});
});

gulp.task('build', ['build_copy', 'build_css', 'build_index']);
gulp.task('dist', ['build']);
