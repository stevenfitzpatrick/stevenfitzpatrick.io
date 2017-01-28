import { h, Component } from 'preact';
import style from './style';
import { Link, route, Router } from 'preact-router';
import config from '../../config';
import cx from 'classnames';

export default class Header extends Component {
  render({ url }) {
    return (
      <header class={style.header}>
        <Nav routes={config.nav} current={url} />
      </header>
    );
  }
}

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
