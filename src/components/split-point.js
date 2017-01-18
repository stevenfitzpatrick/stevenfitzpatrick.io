import { h, Component } from 'preact';

export default class SplitCode extends Component {
  componentWillMount() {
    System.import('./favourites').then(child => {
      this.setState({ child });
    });
  }

  render({ load, path, ...props }, { child }) {
    return child ? h(child.default, props) : null;
  }
}
