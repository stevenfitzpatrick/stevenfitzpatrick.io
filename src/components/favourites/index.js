import { h, Component } from 'preact';
import firebase from '../../base';
import FavouriteItem from './favourite-item';
import style from './style';

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = { favourites: {} };
    this.firebase = firebase.database();
  }

  componentWillMount() {
    const items = this.firebase
      .ref('/favourites').orderByKey()
      .once('value')
      .then(data => {
        const result = data.val();
        let favourites = [];
        Object.keys(result).map(item => favourites.push(result[item]));
        this.setState({ favourites });
      })
      .catch(error => {
      });
  }

  componentWillUnmount() {
    this.firebase.ref('/favourites').off();
  }

  displayItem = item => <FavouriteItem item={item} />;


  render(props, { favourites }) {
    const ifContainsFavourites = Object.keys(favourites).length !== 0;
    let favouriteList = null;

    if (ifContainsFavourites) {
      favouriteList = favourites.map(this.displayItem).reverse();
    } else {
      favouriteList = <span>Loading...</span>;
    }

    return (
      <div class={style.favourites__list}>
        <h2>Favourites</h2>
        {favouriteList}
      </div>
    );
  }
}
