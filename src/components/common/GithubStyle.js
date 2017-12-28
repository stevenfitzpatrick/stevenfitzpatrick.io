import { h } from 'preact';
import Wrap from './Wrap';

function GithubStyle(props) {
  return (
    <Wrap {...props}>
      <rect x="41" y="8" rx="4" ry="4" width="300" height="5" />
      <rect x="41" y="20" rx="3" ry="3" width="300" height="5" />
      <rect x="41" y="35" rx="3" ry="3" width="100" height="5" />
      <circle cx="18" cy="25" r="18" />
    </Wrap>
  );
}

export default GithubStyle;
