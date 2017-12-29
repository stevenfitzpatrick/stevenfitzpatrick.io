import { h, Component } from 'preact';
import styled from 'styled-components';

const CopyButton = styled.button`
  position: absolute;
  right: 1em;
  background: none;
  box-shadow: none;
  text-decoration: underline;
  text-decoration-skip: ink;
  opacity: ${props => (props.visible ? 1 : 0)};
  font-size: 1.2em;
  padding: 0;

  &:hover {
    background: none;
  }
`;

class CopyClipboard extends Component {
  state = {
    copied: false,
    visible: false
  };

  copyText = e => {
    const selection = document.getSelection();
    let range = document.createRange();
    range.selectNode(this.base.querySelector('.highlight'));
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeRange(range);
    this.setState({ copied: true });
  };

  displayCopy = e => {
    this.setState(({ visible }) => ({ visible: true }));
  };

  hideCopy = e => {
    this.setState(({ visible }) => ({ visible: false }));
  };

  render({ children }, { copied, visible }) {
    return (
      <div style={{ position: 'relative' }} onMouseEnter={this.displayCopy} onMouseLeave={this.hideCopy}>
        <CopyButton onClick={this.copyText} visible={visible}>
          {copied ? 'Copied...' : 'Copy'}
        </CopyButton>
        {children}
      </div>
    );
  }
}

export default CopyClipboard;
