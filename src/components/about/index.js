import { h, Component } from 'preact';
import cx from 'classnames';

import { FunkyH5 } from 'style/buttons';
import { withMeta } from 'HOC';
import ProfilePictureJpg from '../../assets/profile.jpg';
import ProfilePictureWebp from '../../assets/profile.webp';
import AngularIcon from '../../assets/svg/angular.svg';
import Html5Icon from '../../assets/svg/html5.svg';
import CSS3Icon from '../../assets/svg/css3.svg';
import Es6Icon from '../../assets/svg/es6.svg';
import ReactIcon from '../../assets/svg/react.svg';
import WebpackIcon from '../../assets/svg/webpack.svg';
import PreactIcon from '../../assets/svg/preact.svg';
import NodeIcon from '../../assets/svg/nodejs.svg';
import style from './style.scss';

export const AboutMe = () => (
  <div class="content about_me">
    <h1>About Me</h1>
    <div class={style.about}>
      <picture>
        <source type="image/webp" srcset={ProfilePictureWebp} />
        <img src={ProfilePictureJpg} class={style.profile} alt="This is me !" />
      </picture>

      <div>
        <p class="introduction">
          I’m a Front End Developer, currently based in Dublin with 8 years’ experience in web development.
        </p>
        <p>
          Hi again my name is Steven Fitzpatrick, thanks for visiting my website and looking to know more about
          me&#8202;! During my time in the web industry I’ve gained experience in all aspects of the development
          lifecycle i.e. UI / UX, front-end / back-end / mobile development , working with / designing databases, agile
          methodology etc…
        </p>
      </div>
    </div>
    <FunkyH5>
      What do I like to do&#8202;<span>?</span>
    </FunkyH5>
    <p>
      Experiencing all that, I enjoy Front End Development the most and this is what I now mainly focus on. It’s
      something I am very enthusiastic and passionate about to work with — but it’s also a hobby of mine. With new
      frameworks, libraries and languages coming out every day to learn it can be very time consuming to keep up with
      but I enjoy the challenge.
    </p>

    <p>
      Hacking away with Build Tools, Page Load Optimizations, Service Workers, Web Design, Node, a random Front-end
      Framework — React / Preact / Angular and some SQL / NoSQL database would be a pretty normal day.
    </p>
    <FunkyH5>
      What’s the aim of the website&#8202;<span>?</span>
    </FunkyH5>
    <p>
      The original aim of this website was just to have a personal playground to test out new features and technologies
      but I will try and expand on that! I will blog about my discoveries and many bugs I encounter in my{' '}
      <a class="link--content" href="/blogs">
        Blogs
      </a>{' '}
      section, and I'm also keeping a personal bookmarking section in my{' '}
      <a class="link--content" href="/favourites">
        Bookmarks
      </a>{' '}
      which will be a list of interesting links I came across on the web. If you have any further questions about me you
      can reach me via the social media links in the footer.
    </p>
    <FunkyH5>
      Stuff I like to work with&#8202;<span>…</span>
    </FunkyH5>
    <Carousel />
  </div>
);

const CarouselItem = ({ glyph, text }) => (
  <div class={style.carousel__item}>
    <svg class={style.icon}>
      <use xlinkHref={`#${glyph.id}`} />
    </svg>
    <span>{text}</span>
  </div>
);

class Carousel extends Component {
  list = [
    {
      text: 'Angular JS',
      glyph: AngularIcon
    },
    {
      text: 'React JS',
      glyph: ReactIcon
    },
    {
      text: 'Preact JS',
      glyph: PreactIcon
    },
    {
      text: 'ES6',
      glyph: Es6Icon
    },
    {
      text: 'HTML 5',
      glyph: Html5Icon
    },
    {
      text: 'CSS 3',
      glyph: CSS3Icon
    },
    {
      text: 'Webpack',
      glyph: WebpackIcon
    },
    {
      text: 'Node JS',
      glyph: NodeIcon
    }
  ];

  renderItem = item => <CarouselItem glyph={item.glyph} text={item.text} />;

  render() {
    return (
      <div class="breakout">
        <div class="breakout-wrapper">
          <div class={cx(style.carousel)}>{this.list.map(this.renderItem)}</div>
        </div>
      </div>
    );
  }
}

export default withMeta(AboutMe);
