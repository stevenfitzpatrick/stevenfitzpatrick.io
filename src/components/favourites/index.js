import { h, Component } from 'preact';
import config from '../../config';
import FavouriteItem from './favourite-item';
import { connect } from 'preact-redux';
import { bindActions } from '../../helpers';
import * as actions from '../../actionCreators';
import FilterList from './FilterList';
import style from './style';
import Loading from '../loading';
import BackToTop from '../backToTop';
import FavouritesList from './FavouritesList';

const mapStateToProps = state => ({
  bookmarks: state.bookmarks,
  tags: state.tags,
  filters: state.filters
});

let timeOut;

const mapObjectToArray = object =>
  Object.keys(object).reduce((list, item) => [...list, object[item]], []);

const getTags = bookmarks => {
  const tags = bookmarks.map(item => [...item.tags]);
  return [].concat(...tags);
};

const uniqueTags = tags =>
  tags.filter((val, idx, array) => array.indexOf(val) === idx);

@connect(mapStateToProps, bindActions(actions))
export default class Favourites extends Component {
  state = { favourites: {} };

  async getFavourites() {
    const data = await fetch(
      'https://stevenfitzpatrick-5181b.firebaseio.com/favourites.json'
    );
    const result = await data.json();
    const favourites = mapObjectToArray(result);
    const tags = uniqueTags(getTags(favourites)).sort();
    this.props.loadTags(tags);
    this.props.loadBookmarks(favourites);
  }

  toggleFilter = tag => {
    const test = this.props.filters;
    if (this.props.filters.includes(tag)) {
      this.props.removeFilter(tag);
    } else {
      this.props.addFilter(tag);
    }
  };

  backToTop = e => {
    if (
      document.body.scrollTop != 0 || document.documentElement.scrollTop != 0
    ) {
      window.scrollBy(0, -100);
      timeOut = setTimeout(this.backToTop, 10);
    } else
      clearTimeout(timeOut);
  };

  componentWillMount() {
    // Set Page Title
    document.title = `Favourites | ${config.title}`;
  }

  componentDidMount() {
    if (this.props.bookmarks && this.props.bookmarks.length) return;
    // Get Items from Firebase
    this.getFavourites();
  }

  render({ tags, bookmarks, filters }) {
    return (
      <div class={`content ${style.favourites__list}`}>
        <h3>Bookmarks</h3>
        <p>
          Below is a list of interesting links I have encountered that I wanted to share with you and also just to save for myself for future reference. The content of the links can be an article, blog or codepen, and I hope you enjoy reading them as much as I did.
          Please note that these are all external links.
        </p>
        <FilterList
          filters={filters}
          tags={tags}
          toggleFilter={this.toggleFilter}
        />
        <FavouritesList bookmarks={bookmarks} />
        <BackToTop>Top</BackToTop>
      </div>
    );
  }
}
