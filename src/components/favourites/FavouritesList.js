import { h, Component } from 'preact';

import FavouriteItem from './favourite-item';

import LoadingHOC from '../HOC/LoaderHOC';

@LoadingHOC
class FavouritesList extends Component {
  displayItem = item => <FavouriteItem item={item} />;

  render({ bookmarks }) {
    return (
      <div>
        <h5> Showing 1 of {bookmarks.length} </h5>
        {bookmarks.map(this.displayItem)}
      </div>
    );
  }
}

export default FavouritesList;
