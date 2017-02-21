import { h, Component } from 'preact';
import styles from './style';
// import AngularIcon from '../../assets/svg/angular.svg';
// import Html5Icon from '../../assets/svg/html5.svg';
// import CSS3Icon from '../../assets/svg/css3.svg';
// import Es6Icon from '../../assets/svg/es6.svg';
// import ReactIcon from '../../assets/svg/react.svg';
// import WebpackIcon from '../../assets/svg/webpack.svg';

export default class Home extends Component {
  render() {
    return (
      <section class={styles.home}>
        <h4>Hello & Welcome !</h4>
        <h2>I’m Steven Fitzpatrick.</h2>
        <h5>Front End Developer</h5>
        <p>
          Welcome to my website, you can learn about me and I will share and blog about my adventures in web development and web design.
        </p>
        <p>
          This site is very much still in process, so check back in a few weeks for hopefully a bit more progress ! Thanks for visiting…
        </p>
      </section>
    );
  }
}

/*class Carousel extends Component {
  constructor() {
    super();
    this.isDown = false;
    this.startX;
    this.scrollLeft;
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

  render() {
    return (
      <div
        class={styles.home__carousel}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
      >
        <div class={styles.carousel__item}>
          <svg>
            <use xlinkHref={AngularIcon} />
          </svg>
          <label>Angular 1/2</label>
        </div>
        <div class={styles.carousel__item}>
          <svg>
            <use xlinkHref={Es6Icon} />
          </svg>
          <label>ES6</label>
        </div>
        <div class={styles.carousel__item}>
          <svg>
            <use xlinkHref={ReactIcon} />
          </svg>
          <label>React JS</label>
        </div>
        <div class={styles.carousel__item}>
          <svg>
            <use xlinkHref={Html5Icon} />
          </svg>
          <label>HTML 5</label>
        </div>
        <div class={styles.carousel__item}>
          <svg>
            <use xlinkHref={CSS3Icon} />
          </svg>
          <label>CSS 3</label>
        </div>
        <div class={styles.carousel__item}>
          <svg>
            <use xlinkHref={WebpackIcon} />
          </svg>
          <label>Webpack</label>
        </div>
      </div>
    );
  }
}*/
