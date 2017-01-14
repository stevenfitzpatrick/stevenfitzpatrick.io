import { h, Component } from 'preact';

import { Router } from 'preact-router';

import Header from './header';

import Home from './home';

import About from './about';

import Footer from './footer';

import Error from './error';

import Favourites from './favourites';

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div class='app'>
        <Header />
        <main>
          <Router onChange={this.handleRoute}>
            <Home path='/' />
            <About path='/about/' />
            <Error type='404' default />
            <Favourites path='/favourites' />
          </Router>
        </main>
        <Footer />
      </div>
    );
  }
}
