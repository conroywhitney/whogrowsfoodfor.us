import React from 'react/addons';
import Title from '../../src/components/Title';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag} = React.addons.TestUtils;

describe('Title', () => {

  it('renders a string', () => {
    const testLabel = "TEST LABEL";
    const component = renderIntoDocument(
      <Title label={testLabel} />
    );
    const divs = scryRenderedDOMComponentsWithTag(component, 'div');
    const title = divs[0];

    expect(divs.length).to.be.above(0);
    expect(title.textContent.length).to.be.above(0);
    expect(title.textContent).to.eq("Map of " + testLabel);
  });

});
