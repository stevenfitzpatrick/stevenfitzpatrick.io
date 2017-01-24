import { h, Component } from 'preact';
import database from '../../base';
import FavouriteItem from '../favourite-item';
import CreateFavourite from '../create-favourite';
import style from './style';


export default class Favourites extends Component {
  constructor() {
    super();
    this.state = { favourites: {} };
  }

  componentWillMount() {
    const items = database.ref('/favourites').once('value').then(data => {
      const result = data.val();
      this.setState({ favourites: result });
    });
  }

  displayItem = (key) => {
    const item = this.state.favourites[key];
    return <FavouriteItem item={item}></FavouriteItem>;
  }

  render(props, { favourites }) {
    return (
      <div class="favourites__list">
        <h1>Favourites</h1>
        {Object.keys(favourites).map(this.displayItem)}
        <CreateFavourite />
      </div>
    );
  }
}
