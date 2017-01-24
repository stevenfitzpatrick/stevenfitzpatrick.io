import { h, Component } from 'preact';
import database from '../../base';

export default class FavouriteItem extends Component {
  constructor() {
    super();
  }

  render({item}) {
    const time = new Date(item.dateAdded).toUTCString();
    return (
      <div>
        <h1>{item.title}</h1>
        <h1>{item.description}</h1>
        <a href={item.url}>{item.url}</a>
        <h1>{item.favourite.toString()}</h1>
        <h1>{item.tags && item.tags.join(',')}</h1>
        <h1>{time}</h1>
      </div>
    )
  }
}