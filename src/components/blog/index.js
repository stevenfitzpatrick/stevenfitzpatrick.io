import { h, Component } from 'preact';
import Markup from 'preact-markup';
import Disqus from '../disqus';
import styles from './style';

export default class Blog extends Component {
  setTitle() {
    const { props } = this, title = props.route.name;
    document.title = `${title}`;
  }

  fetchContent(name) {
    this.getBlogByName(name).then(data => {
      this.setState({
        content: data
      });
    });
  }

  getBlogByName(name) {
    const path = `/content/${name.replace(/\s+/g, '-').toLowerCase()}.html`;

    return fetch(path).then(data => data.text());
  }

  componentDidMount() {
    const { props } = this, title = props.route.name;
    this.setTitle(title);
    this.fetchContent(title);
  }

  render({ route }, { content }) {
    return (
      <div class="blog">
        <article>
          <time>{route.date}</time>
          <h2>{route.name}</h2>
          <Markup markup={content} type="html" />
        </article>
        <Disqus
          shortname="stevenfitzpatrick-io"
          identifier={route.name}
          title={route.name}
        />
      </div>
    );
  }
}
