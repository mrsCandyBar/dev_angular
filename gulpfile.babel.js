/*'use strict';*/

import gulp from 'gulp';
import sass from 'gulp-sass';
import livereload  from 'gulp-livereload';
import webpack from 'webpack-stream';
 
var paths = {
  scripts: 'src/js/',
  dest_scripts: 'build/js',
  sass: 'src/sass/',
  dest_sass: 'build/css',
  pages: '*.html',
};

gulp.task('pageReload', () => {
  return gulp.src(paths.pages)
    .pipe(livereload());
})

gulp.task('sass', function() {
  return gulp.src(paths.sass + '*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dest_sass))
    .pipe(livereload());
});
 
gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(paths.scripts, ['webpacker']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pages, ['pageReload']);
});
 
gulp.task('webpacker', function() {
  return gulp.src(paths.styles + 'main.js')
    .pipe(webpack({
      output: {
        filename: 'main.js'
      },
      module: {
        loaders: [{
          loader: 'babel-loader'
        }]
      }
    }))
    .pipe(gulp.dest(pages.dest_sass))
    .pipe(livereload());
});

gulp.task('default', ['webpacker', 'sass', 'watch']);