import { h } from 'preact';

import { slugifyPath } from '../../utils/helpers';
import FunkyH5 from '../../styles/buttons';
import Link from '../../assets/svg/link.svg';
import { SVGIcon } from './';

export const Anchor = props => (
  <FunkyH5.FunkyAnchor {...props}>
    <SVGIcon glyph={Link} />
  </FunkyH5.FunkyAnchor>
);

export const AnchorTitle = ({ children }) => {
  const [first] = children;
  const text = first.trim();
  const slug = slugifyPath(text.trim());
  return (
    <FunkyH5 id={slug}>
      {text}
      <AnchorTitle.Link href={`#${slug}`} />
    </FunkyH5>
  );
};

AnchorTitle.Link = Anchor;

export default AnchorTitle;
