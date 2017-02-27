import { h, Component } from 'preact';
import Picture from '../../assets/me2.jpg';
import style from './style';

export default class About extends Component {
  render() {
    return (
      <div class="content">
        <h3>About Me</h3>
        <div class={style.about}>
          <img src={Picture} class={style.profile} />
          <p>
            Hi again, thanks for visiting my website and wanting to know more about me!
            {' '}
            I’m a Front End Developer, currently based in Dublin, Ireland with around 8 years’ experience in the Web Development industry. During my time I’ve gained experience in
            {' '}
            all aspects of the development lifecycle i.e. UI / UX, front-end, back-end and mobile development , working with / designing databases, agile methodology etc.
            {' '}
          </p>

        </div>
        <p>
          Experiencing all that, I enjoy Front End Development the most and this is what I now mainly focus on. It's something I am very enthusiastic and passionate about to work with — but it’s also a hobby of mine. With new
          frameworks,libraries and languages coming out every day to learn it can be very time consuming to keep up with but I enjoy the challenge. Hacking away with Module Bundlers, Page Load Optimizations, Service Workers,
          Web Design, Node, React/Preact/Angular and some random Database would be a pretty normal day.
        </p>

        <p>
          I will try and blog about my discoveries and many bugs I encounter in my
          {' '}
          <a href="/blogs">Blogs</a>
          {' '}
          section, and I'm also keeping a personal bookmarking section in my
          {' '}
          <a href="/favourites">Favourites</a>
          {' '}
          section which will just be a list of interesting links I came across on the web. If you have any further questions about me you can reach me via the social media links in the footer.

        </p>
      </div>
    );
  }
}
