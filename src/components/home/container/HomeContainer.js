import { h, Component } from 'preact';

import { withMeta } from 'HOC';
import { getMostRecentCommit } from '../../../clients/api';
import { formatPushEvent } from '../../../utils/helpers';
import Home from '../view/Home';

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
class HomeContainer extends Component {
  state = {
    showAboutMe: false,
    commitMessage: null
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

  getLatestGithubCommit = async () => {
    const [commit] = await getMostRecentCommit();
    const formattedCommit = formatPushEvent(commit);
    this.setState({ commitMessage: formattedCommit });
  };

  async componentDidMount() {
    this.otherSkills = document.querySelector('.other-skills');
    this.otherSkills.addEventListener('animationend', this.toggleAnimation);
    this.timer = setInterval(this.updateSkills, 2500);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { showAboutMe } = this.state;
    if (showAboutMe && !this.Contact) {
      const contactMe = await import(/* webpackChunkName: "chunk-contactme" */ '../view/Contact');
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

  render() {
    const { showAboutMe, commitMessage } = this.state;
    return (
      <Home
        showAboutMe={showAboutMe}
        toggleAboutMe={this.toggleAboutMe}
        github={commitMessage}
        getLatestGithubCommit={this.getLatestGithubCommit}
        Contact={this.Contact}
      />
    );
  }
}

export default HomeContainer;
