import { h, Component } from 'preact';
import style from './style';
import { Link, route, Router } from 'preact-router';
import config from '../../config';
import cx from 'classnames';

export default class Header extends Component {
  state = { open: false };

  toggleMenu = () => {
    requestAnimationFrame(() => {
      this.setState({ open: !this.state.open });
      document.body.classList.toggle('menu--open');
    });
  };

  componentWillReceiveProps({ url }) {
    if (this.state.open) {
      this.toggleMenu();
    }
  }

  render({ url }, { open }) {
    return (
      <header class={cx(style.header, open && style.header__expanded)}>
        <Nav routes={config.nav} current={url} />
        <Menu open={open} onClick={this.toggleMenu} />
      </header>
    );
  }
}

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
