import { h, Component } from 'preact';

import { withMeta } from 'HOC';
import ContactIcon from '../../assets/svg/speech-bubble';
import styles from './style';

const otherSkills = [
  'Problem Solver',
  'Web Developer',
  'Web Designer',
  'Agile',
  '&#x2764; Web Performance',
  'Texas Longhorn Fan',
  'Typography Fan',
  'Love Food'
];

@withMeta
class Home extends Component {
  state = {
    showAboutMe: false
  };

  otherSkills = null;
  index = 1;
  Contact = null;

  toggleAboutMe = () =>
    this.setState({
      showAboutMe: !this.state.showAboutMe
    });

  updateSkills = () => {
    requestAnimationFrame(() => {
      this.otherSkills.innerHTML = otherSkills[this.index];
      this.toggleAnimation();
      this.index = (this.index + 1) % otherSkills.length;
    });
  };

  toggleAnimation = () => requestAnimationFrame(() => this.otherSkills.classList.toggle('popDown'));

  async componentDidMount() {
    this.otherSkills = document.querySelector('.other-skills');
    this.otherSkills.addEventListener('animationend', this.toggleAnimation);
    this.timer = setInterval(this.updateSkills, 2500);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { showAboutMe } = this.state;
    if (showAboutMe && !this.Contact) {
      const contactMe = await import(/* webpackChunkName: "chunk-contactme" */ './Contact');
      this.Contact = contactMe.default;
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    // Stop Interval when switching page
    clearInterval(this.timer);
    // Clear Event Listenter
    this.otherSkills.removeEventListener('animationend', this.toggleAnimation);
  }

  render = (props, { showAboutMe }) => (
    <section class={styles.home}>
      <h4>Hello & Welcome !</h4>

      <h2>I’m Steven Fitzpatrick.</h2>
      <h5>
        <span class="underline">I’m</span> a Front-End Developer &
        <span class="other-skills popDown">Problem Solver</span>
      </h5>
      <button class="button--outline" onClick={this.toggleAboutMe} aria-label="Contact Me">
        <svg>
          <use xlinkHref={`#${ContactIcon.id}`} />
        </svg>
        <span>Contact Me</span>
      </button>
      {this.Contact && (
        <this.Contact displayShowMe={showAboutMe} hideAboutMe={this.toggleAboutMe} />
      )}
    </section>
  );
}

export default Home;
