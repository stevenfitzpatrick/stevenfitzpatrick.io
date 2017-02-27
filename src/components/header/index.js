import { h, Component } from 'preact';
import style from './style';
import { Link, route, Router } from 'preact-router';
import config from '../../config';
import cx from 'classnames';
import LogoImage from '../../assets/svg/Header.svg';

export default class Header extends Component {
  state = { open: false };

  toggleMenu = () => {
    requestAnimationFrame(() => {
      this.setState({ open: !this.state.open });
    });
  };

  componentWillReceiveProps({ url }) {
    if (this.state.open) {
      this.toggleMenu();
    }
  }

  toggleFixedNav = () => {
    if (window.scrollY > 0) {
      requestAnimationFrame(() => {
        this.main.style.paddingTop = `${this.header}px`;
        document.body.classList.add('js-fixed-nav');
      });
    } else {
      requestAnimationFrame(() => {
        this.main.style.paddingTop = 0;
        document.body.classList.remove('js-fixed-nav');
      });
    }
  };

  componentDidMount() {
    this.header = this.base.offsetHeight;
    this.main = document.querySelector('main');
    window.addEventListener('scroll', this.toggleFixedNav);
  }

  loadHome = () => route('/');

  render({ url }, { open }) {
    return (
      <div class={cx(style.header, open && style['header--expanded'])}>
        <header class={style.header__content}>
          <Logo onClick={this.loadHome} image={LogoImage} />

          <Nav routes={config.nav} current={url} />

          <Menu open={open} onClick={this.toggleMenu} />
        </header>
      </div>
    );
  }
}

const Logo = ({ image, ...props }) => (
  <svg {...props} class={style.header__logo}>
    <use xlinkHref={image} />
  </svg>
);

const Menu = ({ open, ...props }) => (
  <div class={style.header__hamburger} {...props}>
    <span />
  </div>
);

const Nav = ({ routes, current, ...props }) => (
  <nav {...props} class={style.header__menu}>
    {routes.map(route => (
      <NavItem
        to={route}
        current={current}
        class={cx(route.name, route.path === current && style.active)}
      />
    ))}
  </nav>
);

class NavItem extends Component {
  visitPage = to => {
    requestAnimationFrame(() => route(to.path));
  };
  render({ to, current, ...props }) {
    return (
      <a href="#0" {...props} onClick={() => this.visitPage(to)}>{to.title}</a>
    );
  }
}
