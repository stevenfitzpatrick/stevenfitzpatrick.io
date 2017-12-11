import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import cx from 'classnames';

import { slugifyPath } from '../utils/helpers';
import style from '../styles/index';
import config from '../config';
import Header from './header';
import Home from './home';
import Footer from './footer';
import 'unfetch/polyfill';

export default class App extends Component {
  state = {
    url: ''
  };

  handleRoute = e => {
    const currentUrl = e.current.attributes.type ? e.current.attributes.type : e.url;
    this.setState({ url: currentUrl });
  };

  About = async () => {
    const module = await import(/* webpackChunkName: "chunk-about" */ './about');
    return module.default;
  };

  Favourites = async () => {
    const module = await import(/* webpackChunkName: "chunk-favourite" */ './favourites');
    return module.default;
  };

  Blog = async () => {
    const module = await import(/* webpackChunkName: "chunk-blog" */ './blog');
    return module.default;
  };

  Writing = async () => {
    const module = await import(/* webpackChunkName: "chunk-writing" */ './writing');
    return module.default;
  };

  Error = async () => {
    const module = await import(/* webpackChunkName: "chunk-404" */ './error');
    return module.default;
  };

  getNavRoutes(nav) {
    return nav.reduce((routes, route) => {
      if (route.blogTitle) {
        routes.push(this.buildRoute(route));
      } else if (route.routes) {
        routes = [...routes, ...this.getNavRoutes(route.routes)];
      }
      return routes;
    }, []);
  }

  buildRoute(route) {
    // Create Friendly URL for Blog
    route.path = slugifyPath(route.blogTitle, '/blog/');
    return (
      <AsyncRoute
        path={route.path}
        route={route}
        getComponent={this.Blog}
        title={route.blogTitle}
        description={route.blogTitle}
      />
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.url === '' && nextState.url === '/') {
      return false;
    }
    return true;
  }

  render(props, state) {
    const blogRoutes = config.nav.filter(route => route.type === 'list');
    const isHome = (state.url === '' || state.url === '/' || state.url === '404') && 'home';
    const isError = state.url === '404' && 'flex-align-center';
    return (
      <div class={style.app}>
        <Header {...state} />
        <main class={cx(isHome, isError)}>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <AsyncRoute
              path="/about"
              getComponent={this.About}
              title="About Me"
              description="Learn a bit more about me !"
            />
            <AsyncRoute
              path="/favourites"
              getComponent={this.Favourites}
              title="Bookmarks"
              description="Checkout my favourite bookmark links regarding React, Javascript, CSS, PWA and more !"
            />
            <AsyncRoute
              path="/writing"
              blogs={blogRoutes}
              getComponent={this.Writing}
              title="Writing"
              description="Checkout my list of blogs regarding front-end development and web performance !"
            />
            {this.getNavRoutes(blogRoutes)}
            <AsyncRoute path="/404" type="404" default title="404" getComponent={this.Error} />
          </Router>
        </main>
        <Footer />
      </div>
    );
  }
}
