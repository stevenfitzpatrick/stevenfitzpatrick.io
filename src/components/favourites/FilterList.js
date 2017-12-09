import { h } from 'preact';
import cx from 'classnames';

import style from './style';

export default function FilterList({ tags, toggleFilter, filters }) {
  return (
    <div class={style.filters}>
      {tags &&
        Object.keys(tags).map(tag => (
          <button
            name={tag}
            class={cx('button--filter', filters === tag && 'filter--active')}
            onClick={toggleFilter}
          >
            <span class={style.button__text}> {tag} </span>{' '}
            <span class={style.button__count}> {tags[tag].count} </span>
          </button>
        ))}
    </div>
  );
}
