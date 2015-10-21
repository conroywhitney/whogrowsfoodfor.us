import {TEMP_DIR, DATA_DIR} from '../constants';
import {arrayToKeyedObject} from './shared_transformer';

export const COUNTY_FILE = TEMP_DIR  + 'county_names.json';

export function transform(county) {
  if(!county) { return {} };

  return {
    key: county.state_fips_short + '' + county.county_fips_short,
    shortName: county.county_name.replace(' County', ''),
    longName: county.county_name + ', ' + county.state_abbreviation
  }
}

