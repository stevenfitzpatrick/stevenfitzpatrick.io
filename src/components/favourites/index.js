import { h, Component } from 'preact';
import database from '../../base';
import FavouriteItem from '../favourite-item';
import CreateFavourite from '../create-favourite';
import style from './style';

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = { favourites: {} };
  }

  componentWillMount() {
    const items = database.ref('/favourites').once('value').then(data => {
      const result = data.val();
      this.setState({ favourites: result });
    });
  }

  componentWillUnmount() {
    database.ref('/favourites').off();
  }

  displayItem = key => {
    const item = this.state.favourites[key];
    return <FavouriteItem item={item} />;
  };

  render(props, { favourites }) {
    const ifContainsFavourites = Object.keys(favourites).length !== 0;
    let favouriteList = null;

    if (ifContainsFavourites) {
      favouriteList = Object.keys(favourites).map(this.displayItem);
    } else {
      favouriteList = <span>Loading...</span>;
    }

    return (
      <div class={style.favourites__list}>
        <h1>Favourites</h1>
        {favouriteList}
        <CreateFavourite />
      </div>
    );
  }
}
