import { h } from 'preact';
import cx from 'classnames';

const SVGIcon = ({ type, glyph }) => (
  <svg class={cx('icon', type)}>
    <use xlinkHref={`#${glyph.id}`} />
  </svg>
);

export default SVGIcon;
