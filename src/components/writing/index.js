import { h, Component } from 'preact';
import config from '../../config.json';
import styles from './style';
import { Link } from 'preact-router';
import styled from 'styled-components';
import cx from 'classnames';

const ArticleTitle = styled.h5`
  font-weight: 700;
  margin: 0;
`;

export default class Writing extends Component {
  displayBlogSummary = blog =>
    <article class={styles.writing__article}>
      <ArticleTitle>
        <Link class="link" href={blog.path}>{blog.blogTitle}</Link>
      </ArticleTitle>
      <smaller>{blog.date} — {blog.duration}</smaller>
      <div class={styles.writing__intro}>
        {blog.intro}
      </div>
      <a class="link link--readmore" href={blog.path}>Read more…</a>
    </article>;

  componentWillMount() {
    document.title = `Writing | ${config.title}`;
  }

  render({ blogs }) {
    const [list] = blogs;
    return (
      <div class={cx('content', styles.writing)}>
        <h3>Writing</h3>
        <p>
          Writing blogs is a first for me, but I hope you enjoy some of these
          and learn something along the way.
        </p>
        {list.routes.map(this.displayBlogSummary)}
      </div>
    );
  }
}
