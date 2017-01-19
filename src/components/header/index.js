import { h, Component } from 'preact';
import style from './style';
import { Link } from 'preact-router';

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/favourites">Favourites</Link>
        </nav>
      </header>
    );
  }
}
