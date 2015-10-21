var
  gulp     = require('gulp-param')(require('gulp'), process.argv),
  download = require('gulp-download'),
  rename   = require('gulp-rename')
;

gulp.task('download', function(url, filename) {
  download(url)
    .pipe(rename(filename))
    .pipe(gulp.dest('./'))
  ;
});

