import { h, Component } from 'preact';
import database from '../../base';

export default class CreateFavourite extends Component {
  constructor() {
    super();
  }

  state = {
    itemName: ''
  }

  createItem = (e) => {
    const itemTitle = this.state.itemName;
    debugger;
    database.ref('/favourites').push({
      test: itemTitle
    })

  }

  render({ }, { itemName }) {
    return (
      <div className="Create">
        <h2>Create New Item</h2>
        <input type="text" value={itemName} onInput={this.linkState('itemName')} />
        <button onClick={this.createItem}>Save</button>
      </div>
    )
  }
}