export function getStateFIPS(string) {
  // FIPS codes are in the thousands
  // Starting with Alabama at 01000
  // and ending with Puerto Rico at 72000
  // A specific county will be a subset, like 01024
  // So can find state by rounding to nearest 1,000
  // Note: notice the prepending 0 on there
  if(string > 0) {
    var
      fips_int    = parseInt(string),
      fips_floor  = Math.floor(fips_int / 1000) * 1000,
      fips_string = normalizeFIPS(fips_floor)
    ;
    return fips_string;
  } else {
    return null;
  }
}

export function normalizeFIPS(number) {
  if(number !== null && number >= 0 && number <= 99999) {
    return ("00000" + number).slice(-5);
  } else {
    return null;
  }
}
