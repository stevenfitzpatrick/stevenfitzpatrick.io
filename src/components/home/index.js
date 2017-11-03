import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { showAboutMe, hideAboutMe } from '../../redux/modules/home';
import styles from './style';
import MetaHOC from '../HOC/MetaHOC';
import ContactIcon from '../../assets/svg/speech-bubble';

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

const mapStateToProps = state => ({
  displayShowMe: state.home.displayShowMe
});

@MetaHOC
@connect(mapStateToProps, { showAboutMe, hideAboutMe })
class Home extends Component {
	updateSkills = () => {
	  requestAnimationFrame(() => {
	    this.otherSkills.innerHTML = otherSkills[this.index];
	    this.toggleAnimation();
	    this.index = (this.index + 1) % otherSkills.length;
	  });
	};

	toggleAnimation = () => requestAnimationFrame(() => this.otherSkills.classList.toggle('popDown'));

	constructor() {
	  super();
	  this.otherSkills = null;
	  this.index = 1;
	  this.Contact = null;
	}

	async componentDidMount() {
	  this.otherSkills = document.querySelector('.other-skills');
	  this.otherSkills.addEventListener('animationend', this.toggleAnimation);
	  this.timer = setInterval(this.updateSkills, 2500);
	}

	async componentWillReceiveProps(nextProps) {
	  if (nextProps.displayShowMe && !this.Contact) {
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

	render = ({ showAboutMe, displayShowMe, hideAboutMe }) => (
	  <section class={styles.home}>
	    <h4>Hello & Welcome !</h4>
	    <h2>I’m Steven Fitzpatrick.</h2>
	    <h5>
	      <span class="underline">I’m</span> a Front-End Developer &
	      <span class="other-skills popDown">Problem Solver</span>
	    </h5>
	    <button class="button--outline" onClick={showAboutMe} aria-label="Contact Me">
	      <svg>
	        <use xlinkHref={`#${ContactIcon.id}`} />
	      </svg>
	      <span>Contact Me</span>
	    </button>
	    {this.Contact && <this.Contact displayShowMe={displayShowMe} hideAboutMe={hideAboutMe} />}
	  </section>
	);
}

export default Home;
