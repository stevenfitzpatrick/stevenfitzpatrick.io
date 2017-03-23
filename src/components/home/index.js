import { h, Component } from 'preact';
import config from '../../config';
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

class Home extends Component {
  updateSkills = () => {
    requestAnimationFrame(() => {
      this.otherSkills.innerHTML = otherSkills[this.index];
      this.toggleAnimation();
      this.index = (this.index + 1) % otherSkills.length;
    });
  };

  toggleAnimation = () =>
    requestAnimationFrame(() => this.otherSkills.classList.toggle('popDown'));

  constructor() {
    super();
    this.otherSkills = null;
    this.index = 1;
  }

  componentWillMount() {
    document.title = `${config.title} | Front End Developer`;
  }

  componentDidMount() {
    this.otherSkills = document.querySelector('.other-skills');
    this.otherSkills.addEventListener('animationend', this.toggleAnimation);
    this.timer = setInterval(this.updateSkills, 2500);
  }

  componentWillUnmount() {
    // Stop Interval when switching page
    clearInterval(this.timer);
    // Clear Event Listenter
    this.otherSkills.removeEventListener('animationend', this.toggleAnimation);
  }

  render = () => (
    <section class={styles.home}>
      <h4>Hello & Welcome !</h4>
      <h2>I’m Steven Fitzpatrick.</h2>
      <h5>
        <span class="underline">I’m</span> a Front-End Developer &
        {' '}
        <span class="other-skills popDown">Problem Solver</span>
      </h5>
    </section>
  );
}

export default Home;
