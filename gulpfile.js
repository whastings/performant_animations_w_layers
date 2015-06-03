'use strict';

var fs = require('fs'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    template = require('gulp-template');

gulp.task('build_index', function() {
  var slidesContent = fs.readFileSync(__dirname + '/slides.md');

  return gulp.src('index.html')
    .pipe(template({slidesContent: slidesContent}))
    .pipe(gulp.dest('build'));
});
