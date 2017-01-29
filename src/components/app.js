import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Header from './header';
import Home from './home';
import Footer from './footer';
import Error from './error';
import About from './about';
import SplitPoint from './split-point';
import style from '../styles/index';

export default class App extends Component {
  state = {
    url: ''
  }
  handleRoute = e => {
    const currentUrl = e.url;
    this.setState({ url: currentUrl });
  };

  render({}, state) {
    return (
      <div class={style.app}>
        <Header {...state} />
        <main>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <About path="/about" />
            <SplitPoint path="/favourites" load={() => import('./favourites') } />
            <SplitPoint path="/create" load={() => import('./create-favourite') } />
            <Error type="404" default />
          </Router>
        </main>
        <Footer />
      </div>
    );
  }
}
