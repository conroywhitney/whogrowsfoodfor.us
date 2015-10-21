var
  gulp         = require('gulp-param')(require('gulp'), process.argv),
  download     = require('gulp-download'),
  replace      = require('gulp-replace'),
  insert       = require('gulp-insert'),
  csv          = require('gulp-csv2json'),
  jsonRefactor = require('gulp-json-refactor'),
  rename       = require('gulp-rename'),
  TEMPDIR      = './data/raw'
;

var geography = [
  {
    url: 'http://www2.census.gov/geo/docs/reference/codes/files/national_county.txt',
    filename: 'counties.csv',
    csv: {
      delimiter: ','
    },
    refactor: {
    }
  },
  {
    url: 'http://www2.census.gov/geo/docs/reference/state.txt',
    filename: 'states.csv',
    csv: {
      delimiter: '|'
    },
    refactor: {
    }
  }
];

gulp.task('geography', function() {
  geography.forEach(function(obj) {
    download(obj.url)
      .pipe(rename(obj.filename))
      .pipe(csv(obj.csv))
      .pipe(rename({extname: '.json'}))
      .pipe(gulp.dest(TEMPDIR))
  });
});

