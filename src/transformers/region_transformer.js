import {TEMP_DIR, DATA_DIR} from '../constants';
import {arrayToKeyedObject} from './shared_transformer';

export const STATES_FILE = TEMP_DIR  + 'state_names.json';
export const COUNTY_FILE = TEMP_DIR  + 'county_names.json';
export const LABELS_FILE = DATA_DIR + 'labels.json';

export function transformCounty(county) {
  if(!county) { return {} };

  return {
    key: county.state_fips_short + '' + county.county_fips_short,
    shortName: county.county_name.replace(' County', ''),
    longName: county.county_name + ', ' + county.state_abbreviation
  }
}

export function transformState(state) {
  if(!state) { return {} };

  return {
    // convert fips into a string to preserve leading 0
    // add 000s for long code
    key: '' + state.state_fips + "000",
    shortName: state.state_abbreviation,
    longName: state.state_name
  }
}


