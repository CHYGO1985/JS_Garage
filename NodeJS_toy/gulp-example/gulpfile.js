/**
 * 
 * Find jsx file, then babel to process es2015 and react.
 * 
 * @author jingjiejiang
 * @history May 2, 2022
 * 
 */
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('default', () => {

  return gulp.src('app/*.jsx')  // find all Reat jsx file
    .pipe(sourcemaps.init())    // starts watching source files to build srcmaps for debug
    .pipe(babel({
      presets: ['@babel/preset-env', '@babel/preset-react']  // config gulp-babel to use es2015 and React
    }))
    .pipe(concat('all.js'))         // concats all source files into all.js
    .pipe(sourcemaps.write('.'))    // write src map files seperately
    .pipe(gulp.dest('dist'));       // redirect all files to the dist/ folder
});

gulp.task('watch', () => {
  watch('app/**.jsx', () => gulp.start('default'));
});