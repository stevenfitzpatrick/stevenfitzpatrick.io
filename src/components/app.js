import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Header from './header';
import Home from './home';
import Footer from './footer';
import Error from './error';
import SplitPoint from './split-point';

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div class="app">
        <Header />
        <main>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <SplitPoint
              path="/about"
              load={require('bundle-loader?lazy!./about')}
            />
            <SplitPoint
              path="/favourites"
              load={require('bundle-loader?lazy!./favourites')}
            />
            <Error type="404" default />
          </Router>
        </main>
        <Footer />
      </div>
    );
  }
}
