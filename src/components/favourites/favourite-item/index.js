import { h, Component } from 'preact';
import style from './style';

const Tag = ({ tag }) => <span>{tag}</span>;

const Time = ({ date }) => {
  const postDate = date.toDateString();

  return (
    <div class={style.favourite__time}>
      {postDate}
    </div>
  );
};

const FavouriteItem = ({ item }) => {
  const time = new Date(item.dateAdded);
  return (
    <div class={style.favourite}>
      <div class={style.favourite__content}>
        <div class={style.favourite__header}>
          <h5>
            <a
              class="link"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
            </a>
          </h5>
        </div>

        <div class={style.favourite__meta}>
          <span>By: </span> {item.author}
          <span>Date: </span> <Time date={time} />
        </div>
        <span class={style.favourite__description}>{item.description}</span>
        <div class={style.tags}>
          {item.tags && item.tags.map(tag => <Tag tag={tag} />)}
        </div>
      </div>
    </div>
  );
};

export default FavouriteItem;
