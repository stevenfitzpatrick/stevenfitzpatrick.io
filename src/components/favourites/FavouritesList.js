import { h, Component } from 'preact';

import { withLoading } from 'HOC';
import FavouriteItem from './favourite-item';

@withLoading
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
