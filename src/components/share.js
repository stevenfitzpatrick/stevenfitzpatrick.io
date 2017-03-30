import { h, Component } from 'preact';
import TwitterLogo from '../assets/svg/twitter.svg';
import LinkedInLogo from '../assets/svg/linkedin.svg';

class Share extends Component {
  shareTwitter(url, text) {
    return event => {
      open(
        `http://twitter.com/share?url=${url}&text=${text}`,
        'tshare',
        'height=400,width=550,resizable=1,toolbar=0,menubar=0,status=0,location=0'
      );
    };
  }

  shareLinkedIn(url, text) {
    return event => {
      open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}&source=stevenfitzpatrick.io`,
        'linkedInshare',
        'height=400,width=550,resizable=1,toolbar=0,menubar=0,status=0,location=0'
      );
    };
  }

  render({ title }) {
    const url = window.location.href;
    return (
      <section class="blog__share">
        <h4>Share this page<span>.</span></h4>
        <button class="button--twitter" onClick={this.shareTwitter(url, title)}>
          <svg class="icon">
            <use xlinkHref={TwitterLogo} />
          </svg>
          <span>Twitter</span>
        </button>

        <button
          class="button--linkedin"
          onClick={this.shareLinkedIn(url, title)}
        >
          <svg class="icon">
            <use xlinkHref={LinkedInLogo} />
          </svg>
          <span>LinkedIn</span>
        </button>
      </section>
    );
  }
}

export default Share;
