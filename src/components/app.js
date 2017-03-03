import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from './header';
import Home from './home';
import Footer from './footer';
import Error from './error';
import Blogs from './blogs';
import Blog from './blog';
import style from '../styles/index';
import config from '../config';

export default class App extends Component {
  state = {
    url: ''
  };

  handleRoute = e => {
    const currentUrl = e.url;
    this.setState({ url: currentUrl });
  };

  About = () => import('./about').then(module => module.default);

  Favourites = () => import('./favourites').then(module => module.default);

  CreateFavourites = () =>
    import('./create-favourite').then(module => module.default);

  getNavRoutes(nav) {
    return nav.reduce(
      (routes, route) => {
        if (route.path) {
          routes.push(this.buildRoute(route));
        }
        if (route.routes) {
          routes = [...routes, ...this.getNavRoutes(route.routes)];
        }
        return routes;
      },
      []
    );
  }

  buildRoute(route) {
    return <Blog path={route.path} route={route} />;
  }

  render({}, state) {
    const staticRoutes = config.nav.filter(route => route.type === 'list');
    return (
      <div class={style.app}>
        <Header {...state} />
        <main>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <AsyncRoute path="/about" component={this.About} />
            <AsyncRoute path="/favourites" component={this.Favourites} />
            <AsyncRoute path="/create" component={this.CreateFavourites} />
            <Blogs path="/blogs" />
            {this.getNavRoutes(staticRoutes)}
            <Error type="404" default />
          </Router>
        </main>
        <Footer />
      </div>
    );
  }
}
