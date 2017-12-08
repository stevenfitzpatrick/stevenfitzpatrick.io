import { h, Component } from 'preact';
// import { connect } from 'unistore';

import style from './style';
import BackToTop from '../backToTop';
import FilterList from './FilterList';
import FavouritesList from './FavouritesList';
import MetaHOC from '../HOC/MetaHOC';

// const mapStateToProps = state => ({
//   bookmarks: state.bookmarks.filter
//     ? state.bookmarks.list.filter(bookmark => bookmark.tags.includes(state.bookmarks.filter))
//     : state.bookmarks.list,
//   tags: state.bookmarks.tags,
//   filter: state.bookmarks.filter
// });

@MetaHOC
// @connect(mapStateToProps, actions)
export default class Favourites extends Component {
  getFavourites() {
    this.props.fetchBookmarks();
  }

  toggleFilter = e => {
    const tag = e.target.name;

    if (this.props.filter.includes(tag)) {
      this.props.removeFilter(tag);
    } else {
      this.props.addFilter(tag);
    }
  };

  componentDidMount() {
    if (this.props.bookmarks && this.props.bookmarks.length) return;
    // Get Items from Firebase
    this.getFavourites();
  }

  render({ tags, bookmarks, filter }) {
    return (
      <div class={`content ${style.favourites__list}`}>
        <h3>Bookmarks</h3>
        <p>
          Below is a list of interesting links I have encountered that I wanted to share with you
          and also just to save for myself for future reference. The content of the links can be an
          article, blog or codepen, and I hope you enjoy reading them as much as I did. Please note
          that these are all external links.
        </p>

        <FilterList filters={filter} tags={tags} toggleFilter={this.toggleFilter} />
        <FavouritesList bookmarks={bookmarks} />
        <BackToTop>Top</BackToTop>
      </div>
    );
  }
}
