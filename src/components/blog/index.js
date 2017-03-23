import { h, Component } from 'preact';
import Markup from 'preact-markup';
import { slugifyPath } from '../../helpers';
import Disqus from '../disqus';
import styles from './style';
import BlogMeta from './blog-meta';
import Highlight from '../highlight';

export default class Blog extends Component {
  setTitle(title) {
    document.title = `${title} | Steven Fitzpatrick`;
  }

  async fetchContent(title) {
    const path = `${slugifyPath(title, '/content/')}.html`;
    const content = await this.getBlogByName(path);
    this.setState({
      content
    });
  }

  getBlogByName(path) {
    return fetch(path).then(data => data.text());
  }

  componentDidMount() {
    const { props } = this, { blogTitle } = props.route;
    this.setTitle(blogTitle);
    this.fetchContent(blogTitle);
  }

  render({ route }, { content }) {
    return (
      <div class="content blog">
        <article>
          <BlogMeta date={route.date} />
          <h2>{route.blogTitle}</h2>
          <Markup
            markup={content}
            type="html"
            trim={false}
            components={{ Highlight }}
          />
        </article>

        <Disqus
          shortname="stevenfitzpatrick-io"
          identifier={route.blogTitle}
          title={route.blogTitle}
        />
      </div>
    );
  }
}
