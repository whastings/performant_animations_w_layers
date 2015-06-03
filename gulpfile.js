'use strict';

var connect = require('gulp-connect'),
    fs = require('fs'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    template = require('gulp-template');

gulp.task('build_copy', ['copy_images', 'copy_vendor']);

gulp.task('build_css', function() {
  return gulp.src('./scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'));
});

gulp.task('build_index', function() {
  var slidesContent = fs.readFileSync(__dirname + '/slides.md');

  return gulp.src('./index.html')
    .pipe(template({slidesContent: slidesContent}))
    .pipe(gulp.dest('./build'));
});

gulp.task('copy_images', function() {
  return gulp.src('./images/*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('copy_vendor', function() {
  return gulp.src('./remark.min.js')
    .pipe(gulp.dest('./build'));
});

gulp.task('dev', function() {
  gulp.watch(['slides.md', 'index.html'], ['build_index']);
  gulp.watch('./scss/**/*.scss', ['build_css']);

  connect.server({port: 8000, root: './build'});
});

gulp.task('build', ['build_copy', 'build_css', 'build_index']);
