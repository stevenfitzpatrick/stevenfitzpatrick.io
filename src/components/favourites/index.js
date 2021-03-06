import { h, Component } from 'preact';
import { connect } from 'unistore/preact';

import { withMeta } from 'HOC';
import BackToTop from '../backToTop';
import FilterList from './FilterList';
import FavouritesList from './FavouritesList';
import actions from './unistore';
import style from './style';

const mapStateToProps = ({ bookmarks: { filter, list, tags } } = {}) => ({
  bookmarks: filter ? list.filter(bookmark => bookmark.tags.includes(filter)) : list,
  tags,
  filter
});

@withMeta
@connect(mapStateToProps, actions)
export default class Favourites extends Component {
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
    this.props.fetchBookmarks();
  }

  render({ tags, bookmarks, filter }) {
    return (
      <div class={`content ${style.favourites__list}`}>
        <h1>Bookmarks</h1>
        <p>
          Below is a list of interesting links I have encountered that I wanted to share with you and also just to save
          for myself for future reference. The content of the links can be an article, blog or codepen, and I hope you
          enjoy reading them as much as I did. Please note that these are all external links.
        </p>

        <FilterList filters={filter} tags={tags} toggleFilter={this.toggleFilter} />
        <FavouritesList bookmarks={bookmarks} />
        <BackToTop>Top</BackToTop>
      </div>
    );
  }
}
