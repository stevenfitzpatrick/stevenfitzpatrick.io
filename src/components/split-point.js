import { h, Component } from 'preact';

export default class SplitCode extends Component {
  componentWillMount() {
    this.props.load(this.linkState('child'));
  }
  render(props, { child }) {
    return child ? h(child.default, props) : null;
  }
}
