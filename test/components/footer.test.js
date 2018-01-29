import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import Footer from '../../src/components/footer';

describe('Footer', () => {
  it('should render icons', () => {
    const context = shallow(<Footer />);
    expect(context.find('footer').length).toEqual(1);
    expect(context.find('FooterIcon').length).toEqual(4);
  });
});
