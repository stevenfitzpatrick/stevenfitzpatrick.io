import { h, render, rerender } from 'preact';
import { route } from 'preact-router';
import App from 'components/app';
import 'style';

/*global sinon,expect*/
describe('App', () => {
  let scratch;

  before(() => {
    scratch = document.createElement('div');

    (document.body || document.documentElement).appendChild(scratch);
  });

  beforeEach(() => {
    scratch.innerHTML = '';
  });

  after(() => {
    scratch.parentNode.removeChild(scratch);
  });

  describe('routing', () => {
    it('should render the homepage', () => {
      render(<App />, scratch);

      expect(scratch.innerHTML).to.contain('Home');
    });

    it('should render the header', () => {
      render(<App />, scratch);

      expect(scratch.innerHTML).to.contain('Header');
    });

    it('should render the footer', () => {
      render(<App />, scratch);

      expect(scratch.innerHTML).to.contain('Footer');
    });
  });
});
