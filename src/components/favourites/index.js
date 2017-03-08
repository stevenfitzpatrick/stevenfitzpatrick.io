import { h, Component } from 'preact';
import firebase from '../../base';
import FavouriteItem from './favourite-item';
import ExternalSVG from '../../assets/svg/external.svg';
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
      .orderByKey()
      .once('value')
      .then(data => {
        const result = data.val();
        let favourites = [];
        Object.keys(result).map(item => favourites.push(result[item]));
        this.setState({ favourites });
      })
      .catch(error => {});
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
        <h3>Favourites</h3>
        <p>
          Below is a list of interesting links I have encountered that I wanted to share with you and also just to save for myself for future reference. The content of the links can be an article, blog or codepen, and I hope you enjoy reading them as much as I did.
          Please note that these are all external links.
        </p>
        {favouriteList}
      </div>
    );
  }
}
