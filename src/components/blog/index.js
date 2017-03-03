import { h, Component } from 'preact';
import Markup from 'preact-markup';

export default class Blog extends Component {
  componentDidMount() {
    const { props } = this, title = props.route.name;
    this.setTitle(title);
    this.fetchContent(title);
  }

  getBlogByName(name) {
    const path = `/content/${name.replace(/\s+/g, '-').toLowerCase()}.md`;

    return fetch(path).then(data => data.text());
  }

  fetchContent(name) {
    this.getBlogByName(name).then(data => {
      this.setState({
        content: data
      });
    });
  }

  setTitle() {
    const { props } = this, title = props.route.name;
    document.title = `${title}`;
  }

  render({ route }, { content }) {
    return (
      <div>
        <h2>this is a blog entry for </h2>
        <Markup markup={content} type="html" />
      </div>
    );
  }
}
