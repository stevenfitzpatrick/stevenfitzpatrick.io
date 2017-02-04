import { h, Component } from 'preact';
import style from './style';
import moment from 'moment';

const Tag = ({ tag }) => <span>{tag}</span>;

const Time = ({ date }) => {
  const postDate = moment(date).format('Do MMM YYYY');

  return (
    <div class={style.favourite__item__time}>
      {postDate}
    </div>
  );
};

const FavouriteItem = ({ item }) => {
  const time = new Date(item.dateAdded);
  return (
    <div class={style.favourite__item}>
      <div class={style.favourite__item__content}>
        <h4><a href={item.url}>{item.title}</a></h4>
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