import { h } from 'preact';
import Wrap from './Wrap';

function GithubStyle(props) {
  return (
    <Wrap {...props}>
      <rect x="45" y="8" rx="4" ry="4" width="300" height="5" />
      <rect x="45" y="20" rx="3" ry="3" width="300" height="5" />
      <rect x="45" y="35" rx="3" ry="3" width="200" height="5" />
      <circle cx="20" cy="25" r="20" />
    </Wrap>
  );
}

export default GithubStyle;
