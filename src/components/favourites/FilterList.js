import { h } from 'preact';
import style from './style';
import cx from 'classnames';

export default ({ tags, toggleFilter, filters }) => (
  <div class={style.filters}>
    {tags &&
      tags.map(tag => (
        <div
          role="button"
          class={cx(style.filter, filters.includes(tag) && 'filter--active')}
          onClick={() => toggleFilter(tag)}
        >
          {tag}
        </div>
      ))}
  </div>
);
