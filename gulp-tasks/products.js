var
  gulp         = require('gulp-param')(require('gulp'), process.argv),
  download     = require('gulp-download'),
  replace      = require('gulp-replace'),
  insert       = require('gulp-insert'),
  parse        = require('csv-parse'),
  jsonRefactor = require('gulp-json-refactor'),
  rename       = require('gulp-rename')
  TEMPDIR      = './data/raw'
  products     = {

  }
;


