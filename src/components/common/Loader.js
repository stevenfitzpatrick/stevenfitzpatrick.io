import { h, Component } from 'preact';

import GithubStyle from './GithubStyle';
import Wrap from './Wrap';

export default class Loader extends Component {
  render({ type, ...props }) {
    switch (type.toLowerCase()) {
      case 'github':
        return <GithubStyle {...props} />;
      default:
        return <GithubStyle {...props} />;
    }
  }
}

Loader.defaultProps = {
  type: 'github',
  speed: 2,
  width: 500,
  height: 60,
  primaryColor: '#f0f0f0',
  secondaryColor: '#e0e0e0'
};

const Rect = ({ x = 0, y = 0, radius = 0, width = 50, height = 50 }) => (
  <rect x={x} y={y} rx={radius} ry={radius} width={width} height={height} />
);

const Circle = ({ x = 0, y = 0, radius = 50 }) => <circle cx={x} cy={y} r={radius} />;

Loader.Wrap = Wrap;
Loader.Circle = Circle;
Loader.Rect = Rect;
