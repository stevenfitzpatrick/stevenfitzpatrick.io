import { h, Component } from 'preact';
import firebase from '../../base';
import styles from './style';
import firebase_database from 'firebase/database';

const SuccessMessage = ({ itemKey }) => {
  if (!itemKey) return;

  return (
    <div class={styles.success}>
      Favourite Item has been created : {itemKey}
    </div>
  );
};

export default class CreateFavourite extends Component {
  constructor() {
    super();
    this.firebase = firebase.database();
  }

  state = {
    title: '',
    url: '',
    description: '',
    author: '',
    tags: [],
    favourite: false,
    key: null
  };

  clearForm = e => {
    e.preventDefault();
    this.setState({
      title: '',
      url: '',
      description: '',
      author: '',
      tags: [],
      favourite: false,
      key: null
    });
  };

  createItem = e => {
    e.preventDefault();
    const { title, url, description, author, tags } = this.state;
    const tagsToArray = tags.split(',').map(tag => tag.trim());
    this.firebase
      .ref('/favourites')
      .push({
        title,
        description,
        url,
        author,
        favourite: false,
        dateAdded: firebase_database.ServerValue.TIMESTAMP,
        tags: tagsToArray
      })
      .then(snap => {
        const key = snap.key;
        this.setState({ key });
      });
  };

  componentWillUnmount() {
    this.firebase.ref('favourites').off();
  }

  render({}, { title, url, description, author, tags, key }) {
    return (
      <section>
        <SuccessMessage itemKey={key} />
        <form onSubmit={this.createItem} class={styles.form}>
          <h3>New Favourite</h3>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              required
              autofocus
              placeholder="Favourite Title"
              onInput={this.linkState('title')}
            />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input
              id="url"
              type="url"
              required
              value={url}
              placeholder="Favourite URL"
              onInput={this.linkState('url')}
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              id="author"
              type="author"
              required
              placeholder="Author URL"
              value={author}
              onInput={this.linkState('author')}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              required
              placeholder="Favourite Description"
              value={description}
              onInput={this.linkState('description')}
            />
          </div>
          <div>
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              type="text"
              value={tags}
              required
              placeholder="Sample Tags"
              onInput={this.linkState('tags')}
            />
          </div>
          <div>
            <button type="reset" onClick={this.clearForm}>Clear</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}
