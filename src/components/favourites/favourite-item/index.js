import { h, Component } from 'preact';
import style from './style';
import moment from 'moment';

const Tag = ({ tag }) => <span>{tag}</span>;

const Time = ({ date }) => {
  const postDate = moment(date);
  const day = postDate.format('Do');
  const month = postDate.format('MMM');
  const year = postDate.year();

  return (
    <div class={style.favourite__item__time}>
      <span>{day} {month}</span>
      <span>{year}</span>
    </div>
  );
};

const FavouriteItem = ({ item }) => {
  const time = new Date(item.dateAdded);
  return (
    <div class={style.favourite__item}>
      <Time date={time} />
      <div class={style.favourite__item__content}>
        <h4><a href={item.url}>{item.title}</a></h4>
        <span>By : {item.author}</span>
        <span>{item.description}</span>
        <div class={style.tags}>
          {item.tags && item.tags.map(tag => <Tag tag={tag} />)}
        </div>
      </div>
    </div>
  );
};

export default FavouriteItem;
