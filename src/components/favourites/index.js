import { h, Component } from 'preact';
import firebase from '../../base';
import FavouriteItem from '../favourite-item';
import style from './style';

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = { favourites: {} };
    this.firebase = firebase.database();
  }

  componentWillMount() {
    const items = this.firebase
      .ref('/favourites')
      .once('value')
      .then(data => {
        const result = data.val();
        this.setState({ favourites: result });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.firebase.ref('/favourites').off();
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
      </div>
    );
  }
}
