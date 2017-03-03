import { h, Component } from 'preact';
import ProfilePictureJpg from '../../assets/profile.jpg';
import ProfilePictureWebp from '../../assets/profile.webp';
import style from './style';
import AngularIcon from '../../assets/svg/angular.svg';
import Html5Icon from '../../assets/svg/html5.svg';
import CSS3Icon from '../../assets/svg/css3.svg';
import Es6Icon from '../../assets/svg/es6.svg';
import ReactIcon from '../../assets/svg/react.svg';
import WebpackIcon from '../../assets/svg/webpack.svg';

export default class About extends Component {
  render() {
    return (
      <div class="content">
        <h3>About Me</h3>
        <div class={style.about}>
          <picture>
            <source type="image/webp" srcset={ProfilePictureWebp} />
            <img
              src={ProfilePictureJpg}
              class={style.profile}
              alt="This is me !"
            />
          </picture>

          <div>
            <p class="introduction">
              I’m a Front End Developer, currently based in Dublin with around 8 years’ experience in web development.
            </p>
            <p>
              Hi again my name is Steven Fitzpatrick, thanks for visiting my website and looking to know more about me!
              During my time in the web industry I’ve gained experience in all aspects of the development lifecycle i.e. UI / UX, front-end / back-end / mobile development , working with / designing databases, agile methodology etc…
            </p>
          </div>
        </div>
        <p>
          Experiencing all that, I enjoy Front End Development the most and this is what I now mainly focus on. It's something I am very enthusiastic and passionate about to work with — but it’s also a hobby of mine. With new
          frameworks,libraries and languages coming out every day to learn it can be very time consuming to keep up with but I enjoy the challenge. Hacking away with Module Bundlers, Page Load Optimizations, Service Workers,
          Web Design, Node, React/Preact/Angular and some random database would be a pretty normal day.
        </p>

        <p>
          The original aim of this website was just to have a personal playground to test out new features and technologies but I will try and expand on that ! I will blog about my discoveries and many bugs I encounter in my
          {' '}
          <a href="/blogs">Blogs</a>
          {' '}
          section, and I'm also keeping a personal bookmarking section in my
          {' '}
          <a href="/favourites">Favourites</a>
          {' '}
          section which will just be a list of interesting links I came across on the web. If you have any further questions about me you can reach me via the social media links in the footer.

        </p>
        <h4>Stuff I like to work with :</h4>
        <Carousel />
      </div>
    );
  }
}

const CarouselItem = ({ glyph, ...children }) => (
  <div class={style.carousel__item}>
    <svg>
      <use xlinkHref={glyph} />
    </svg>
    <label>{children}</label>
  </div>
);

class Carousel extends Component {
  constructor() {
    super();
    this.isDown = false;
    this.startX;
    this.scrollLeft;
    this.list = [
      {
        text: 'Angular JS',
        glyph: AngularIcon
      },
      {
        text: 'React JS',
        glyph: ReactIcon
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
      }
    ];
  }

  state = {
    active: false
  };

  onMouseDown = e => {
    this.isDown = true;
    this.startX = e.pageX - this.base.offsetLeft;
    this.scrollLeft = this.base.scrollLeft;
    this.setState({ active: true });
  };

  onMouseLeave = () => {
    this.isDown = false;
    this.setState({ active: false });
  };

  onMouseUp = () => {
    this.isDown = false;
    this.setState({ active: false });
  };

  onMouseMove = e => {
    if (!this.isDown) return;
    e.preventDefault();

    const x = e.pageX - this.base.offsetLeft;
    const walk = x - this.startX;
    this.base.scrollLeft = this.scrollLeft - walk;
  };

  renderItem = item => (
    <CarouselItem glyph={item.glyph}>{item.text}</CarouselItem>
  );

  render() {
    return (
      <div
        class={style.carousel}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
      >
        {this.list.map(this.renderItem)}
      </div>
    );
  }
}
