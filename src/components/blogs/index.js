import { h, Component } from 'preact';
import config from '../../config.json';
import styles from './style';

export default class Blogs extends Component {
  displayBlogSummary = blog => (
    <article>
      <h5><a href={blog.path}>{blog.name}</a></h5>
      <smaller>{blog.date} — {blog.duration}</smaller>
      <div class={styles.blog__content}>
        {blog.intro}
      </div>
      <a class="link" href={blog.path}>Read more…</a>
    </article>
  );

  render({ blogs }) {
    const [list] = blogs;
    return (
      <div>
        <h3>Writing</h3>
        <p>
          Writing blogs is a first for me, but I hope you enjoy some of these and learn something along the way.
        </p>
        {list.routes.map(this.displayBlogSummary)}
      </div>
    );
  }
}
