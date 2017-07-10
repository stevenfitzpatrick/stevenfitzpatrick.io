import { h, Component } from 'preact';
import Markup from 'preact-markup';
import MetaHOC from '../HOC/MetaHOC';
import { slugifyPath } from '../../helpers';
import Disqus from '../disqus';
import styles from './style';
import BlogMeta from './blog-meta';
import Highlight from '../highlight';
import Share from '../share';
import BackToTop from '../backToTop';
import shareThis from 'share-this';
import * as twitterSharer from 'share-this/dist/sharers/twitter';
import 'share-this/dist/share-this.css';

@MetaHOC
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

    requestAnimationFrame(() => {
      const selectionShare = shareThis({
        selector: '.blog',
        sharers: [twitterSharer]
      });

      selectionShare.init();
    });
  }

  render({ route }, { content }) {
    return (
      <div class="content blog">
        {content &&
          <section>
            <article>
              <BlogMeta date={route.date} />
              <h2>
                {route.blogTitle}
              </h2>
              <Markup
                markup={content}
                type="html"
                trim={false}
                components={{ Highlight }}
              />
            </article>
            <Share title={route.blogTitle} />
            <Disqus
              shortname="stevenfitzpatrick-io"
              disqus_developer="1"
              identifier={route.blogTitle}
              title={route.blogTitle}
            />
            <BackToTop>Top</BackToTop>
          </section>}
      </div>
    );
  }
}
