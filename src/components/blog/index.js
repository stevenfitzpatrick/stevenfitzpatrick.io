import { h, Component } from 'preact';
import Markup from 'preact-markup';

import { FunkyH5 } from 'style/buttons';
import { withMeta } from 'HOC';
import { slugifyPath } from '../../utils/helpers';
import Highlight from '../highlight';
import Share from '../share';
import BackToTop from '../backToTop';
import BlogMeta from './BlogMeta';
import './style';

@withMeta
export default class Blog extends Component {
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
    const { props } = this,
      { blogTitle } = props.route;
    this.fetchContent(blogTitle);
  }

  render({ route }, { content }) {
    return (
      <div class="content blog">
        {content && (
          <section>
            <article>
              <BlogMeta date={route.date} />
              <h2>{route.blogTitle}</h2>
              <Markup markup={content} type="html" trim={false} components={{ FunkyH5, Highlight }} />
            </article>
            <Share title={route.blogTitle} />

            <BackToTop>Top</BackToTop>
          </section>
        )}
      </div>
    );
  }
}
