import {expect} from 'chai';

import {arrayToKeyedObject} from '../../src/transformers/shared_transformer'
import {transformCounty, transformState} from '../../src/transformers/region_transformer'

describe('region transformer', () => {

  const expectedKeys = ['key', 'shortName', 'longName'];

  describe('transformCounty', () => {

    var
      testCounty = {"state_abbreviation":"OR","state_fips_short":41,"county_fips_short":"029","county_name":"Jackson County","county_fips_class_code":"H1","fips":"41029","short":"Jackson","long":"Jackson County, OR"}
    ;

    it('should return blank object on null', () => {
      expect(transformCounty(null)).to.eql({});
    });

    it('should return appropriate keys', () => {
      var
        resultObject = transformState(testCounty),
        resultKeys   = Object.keys(resultObject)
      ;

      expectedKeys.forEach(k => expect(resultKeys).to.contain(k));
    });

    it('should transform intput into output', () => {
      var
        resultObject = transformCounty(testCounty),
        expected = {
          key: "41029",
          longName: "Jackson County, OR",
          shortName: "Jackson"
        }
      ;

      expect(resultObject).to.eql(expected);
    });

  });

  describe('transformState', () => {

    var
      testState = {"state_fips":41,"state_abbreviation":"OR","state_name":"Oregon","state_ens":"01155107","fips":"41000","short":"OR","long":"Oregon"}
    ;

    it('should return blank object on null', () => {
      expect(transformState(null)).to.eql({});
    });

    it('should return appropriate keys', () => {
      var
        resultObject = transformState(testState),
        resultKeys   = Object.keys(resultObject)
      ;

      expectedKeys.forEach(k => expect(resultKeys).to.contain(k));
    });

    it('should transform intput into output', () => {
      var
        resultObject = transformState(testState),
        expected = {
          key: "41000",
          longName: "Oregon",
          shortName: "OR"
        }
      ;

      expect(resultObject).to.eql(expected);
    });

  });

});
