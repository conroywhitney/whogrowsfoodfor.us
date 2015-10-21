import {expect} from 'chai';

import {REGION_KEYS} from '../../src/constants';
import {arrayToKeyedObject} from '../../src/transformers/shared_transformer'
import {transform} from '../../src/transformers/state_transformer'

describe('state transformer', () => {

  describe('transform', () => {

    var
      testState = {"state_fips":41,"state_abbreviation":"OR","state_name":"Oregon","state_ens":"01155107","fips":"41000","short":"OR","long":"Oregon"}
    ;

    it('should return blank object on null', () => {
      expect(transform(null)).to.eql({});
    });

    it('should return appropriate keys', () => {
      var
        resultObject = transform(testState),
        resultKeys   = Object.keys(resultObject)
      ;

      REGION_KEYS.forEach(k => expect(resultKeys).to.contain(k));
    });

    it('should transform intput into output', () => {
      var
        resultObject = transform(testState),
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
