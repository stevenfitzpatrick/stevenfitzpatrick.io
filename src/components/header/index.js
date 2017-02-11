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

  loadHome = () => route('/');

  render({ url }, { open }) {
    return (
      <div class={style.header__container}>
        <header
          class={cx(style.header__content, open && style.header__expanded)}
        >
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

const NavItem = ({ to, current, ...props }) => (
  <a href={to.path} {...props}>{to.title}</a>
);
