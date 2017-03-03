import { h, Component } from 'preact';
import styles from './style';

export default class Home extends Component {
  render() {
    return (
      <section class={styles.home}>
        <h4>Hello & Welcome !</h4>
        <h2>I’m Steven Fitzpatrick.</h2>
        <h5>Front End Developer</h5>
        <p>
          Welcome to my website, you can learn about me and I will share and blog about my adventures in web development and web design.
        </p>
        <p>
          This site is very much still in process, so check back in a few weeks for hopefully a bit more progress ! Thanks for visiting…
        </p>
      </section>
    );
  }
}
