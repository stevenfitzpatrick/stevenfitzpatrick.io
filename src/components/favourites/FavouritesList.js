import { h, Component } from 'preact';
import FavouriteItem from './favourite-item';
import LoadingHOC from '../HOC/LoaderHOC';

@LoadingHOC class FavouritesList extends Component {
  displayItem = item => <FavouriteItem item={item} />;

  render({ bookmarks }) {
    return (
      <div>
        {bookmarks.map(this.displayItem)}
      </div>
    );
  }
}

export default FavouritesList;
