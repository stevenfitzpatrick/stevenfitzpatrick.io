import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import { AboutMe } from '../../src/components/about';

describe('Footer', () => {
  it('should render icons', () => {
    const context = shallow(<AboutMe />);
    expect(context.find('Carousel').length).toEqual(1);
  });
});
