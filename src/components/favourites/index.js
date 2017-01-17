import { h, Component } from 'preact';

// import database from '../../base';
export default class Favourites extends Component {
  constructor() {
    super();

    this.state = { favourites: {} };
  }

  // componentWillMount() {
  //     database.ref('favourites').set(this.state.favourites);
  // }
  // componentWillUnmount() {
  //     database.goOffline();
  // }
  // async asyncFun () {
  //     const value = await Promise
  //         .resolve(1)
  //         .then(x => x * 3)
  //         .then(x => x + 5)
  //         .then(x => x / 2);
  //     return value;
  // }
  render(props, state) {
    return <h1>Favourites</h1>;
  }
}
