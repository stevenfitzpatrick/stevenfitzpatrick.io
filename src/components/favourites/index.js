import { h, Component } from 'preact';
import config from '../../config';
import FavouriteItem from './favourite-item';
import { connect } from 'preact-redux';
import { bindActions } from '../../helpers';
import reduce from '../../reducers';
import * as actions from '../../actions';
import style from './style';
import Loading from '../loading';

@connect(reduce, bindActions(actions))
export default class Favourites extends Component {
  displayItem = item => <FavouriteItem item={item} />;

  state = { favourites: {} };

  async getFavourites() {
    const data = await fetch(
      'https://stevenfitzpatrick-5181b.firebaseio.com/favourites.json'
    );
    const result = await data.json();
    let favourites = [];
    Object.keys(result).map(item => favourites.push(result[item]));
    this.props.loadBookmarks(favourites);
  }

  componentWillMount() {
    // Set Page Title
    document.title = `Favourites | ${config.title}`;
  }

  componentDidMount() {
    if (this.props.bookmarks && this.props.bookmarks.length) return;
    // Get Items from Firebase
    this.getFavourites();
  }

  render({ bookmarks }) {
    const ifContainsFavourites = Object.keys(bookmarks).length !== 0;
    let favouriteList = null;
    if (ifContainsFavourites) {
      favouriteList = bookmarks.map(this.displayItem).reverse();
    } else {
      favouriteList = <Loading />;
    }

    return (
      <div class={`content ${style.favourites__list}`}>
        <h3>Bookmarks</h3>
        <p>
          Below is a list of interesting links I have encountered that I wanted to share with you and also just to save for myself for future reference. The content of the links can be an article, blog or codepen, and I hope you enjoy reading them as much as I did.
          Please note that these are all external links.
        </p>
        {favouriteList}
      </div>
    );
  }
}
