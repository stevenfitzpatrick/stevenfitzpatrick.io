import { h, Component } from 'preact';
import auth from 'firebase/auth';
import firebase from '../../base';
import styles from './style';
import { SuccessMessage } from '../common/';

export default class CreateFavourite extends Component {
  state = {
    title: '',
    url: '',
    description: '',
    author: '',
    tags: [],
    favourite: false,
    key: null,
    uid: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  renderLogin = () => (
    <section class={styles.login}>
      <p>Please login to create a new favourite.</p>
      <button onClick={this.authenticate}>Login</button>
    </section>
  );

  authenticate = type => {
    const auth = firebase.auth();
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider).then(this.authHandler);
  };

  signOut = () => {
    firebase.auth().signOut().then(() => this.setState({ uid: null }));
  };

  authHandler = authData => {
    this.setState({ uid: authData.user.uid });
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
    firebase
      .database()
      .ref('/favourites')
      .push({
        title,
        description,
        url,
        author,
        favourite: false,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        tags: tagsToArray
      })
      .then(snap => {
        const key = snap.key;
        this.setState({ key });
      });
  };

  render({}, { title, url, description, author, tags, key, uid }) {
    // check if Logged input
    if (!uid) {
      return <section class={styles.login}>{this.renderLogin()}</section>;
    }

    return (
      <section>
        <button onClick={this.signOut}>Logout </button>
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
