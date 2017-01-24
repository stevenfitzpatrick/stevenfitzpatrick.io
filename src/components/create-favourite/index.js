import { h, Component } from 'preact';
import database from '../../base';
import firebase_database from 'firebase/database';

export default class CreateFavourite extends Component {
  constructor() {
    super();
  }

  state = {
    title: '',
    url: ''
  }

  createItem = (e) => {
    const {title, url, description, author } = this.state;
    database.ref('/favourites').push({
      title,
      description,
      url,
      author,
      favourite: false,
      dateAdded: firebase_database.ServerValue.TIMESTAMP,
      tags: ['SVG', 'Preact']
    })
  }

  render({ }, { title, url, description, author }) {
    return (
      <div className="Create">
        <h2>Create New Item</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" value={title} onInput={this.linkState('title')} />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input id="url" type="url" value={url} onInput={this.linkState('url')} />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input id="author" type="author" value={author} onInput={this.linkState('author')} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input id="description" type="text" value={description} onInput={this.linkState('description')} />
        </div>
        <button onClick={this.createItem}>Save</button>
      </div>
    )
  }
}