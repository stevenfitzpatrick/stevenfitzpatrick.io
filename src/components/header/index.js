import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import cx from 'classnames';

import config from '../../config';
import LogoImage from '../../assets/svg/Header';
import style from './style';

const expandedHeaderClass = 'header--expanded';
export default class Header extends Component {
  state = { open: false };

  /**
   *  Toggle the Header Animation
   */
  toggleMenu = () => {
    requestAnimationFrame(() => {
      this.setState({ open: !this.state.open });
    });
  };

  /**
   * Hide Menu also when the body is clicked
   */
  hideMenu = event => {
    if (event.target.tagName === 'DIV' && event.target.className.includes(expandedHeaderClass)) {
      this.toggleMenu();
      this.base.removeEventListener('click', this.hideMenu, {
        once: true
      });
    }
  };

  loadHome = () => {
    route('/');
  };

  componentDidMount() {
    requestAnimationFrame(() => {
      this.header = this.base.offsetHeight;
      this.main = document.querySelector('main');
      this.main.style.paddingTop = `${this.header}px`;
    });
  }

  componentWillReceiveProps({ url }) {
    if (this.state.open) {
      this.toggleMenu();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.url !== nextProps.url && nextState.open) {
      return false;
    }
    return true;
  }

  componentDidUpdate(props, state) {
    if (this.state.open) {
      this.base.addEventListener('click', this.hideMenu, {
        once: true
      });
    }
  }

  render({ url }, { open }) {
    return (
      <div class={cx(style.header, open && style[expandedHeaderClass])}>
        <header class={style.header__content} role="banner">
          <Logo onKeyPress={this.loadHome} onClick={this.loadHome} image={LogoImage} role="link" tabindex="0" />
          <Nav routes={config.nav} />
          <Menu open={open} onClick={this.toggleMenu} />
        </header>
      </div>
    );
  }
}

// Header Main Logo
const Logo = ({ image, ...props }) => (
  <svg {...props} class={style.header__logo}>
    <use xlinkHref={`#${image.id}`} />
  </svg>
);

// Hamburger Menu for Mobile
const Menu = ({ open, ...props }) => (
  <div class={style.header__hamburger} {...props} role="button" aria-label="Main Menu">
    <span />
  </div>
);

// Header Navigation
const Nav = ({ routes, current, ...props }) => (
  <nav {...props} class={style.header__menu} aria-label="Main Navigation" role="navigation">
    {routes.filter(route => route.type === 'page').map(({ path, title }) => (
      <Link href={path} activeClassName={style.active}>
        {title}
      </Link>
    ))}
  </nav>
);
