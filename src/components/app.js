import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from './header';
import Home from './home';
import Footer from './footer';
import Error from './error';
import About from './about';
import Blogs from './blogs';
import Blog from './blog';
import style from '../styles/index';

export default class App extends Component {
  state = {
    url: ''
  };

  handleRoute = e => {
    const currentUrl = e.url;
    this.setState({ url: currentUrl });
  };

  Favourites = () => import('./favourites').then(module => module.default);

  CreateFavourites = () =>
    import('./create-favourite').then(module => module.default);

  render({}, state) {
    return (
      <div class={style.app}>
        <Header {...state} />
        <main>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <About path="/about" />
            <Blogs path="/blogs" />
            <Blog path="/blog/:title" />
            <AsyncRoute path="/favourites" component={this.Favourites} />
            <AsyncRoute path="/create" component={this.CreateFavourites} />
            <Error type="404" default />
          </Router>
        </main>
        <Footer />
      </div>
    );
  }
}
