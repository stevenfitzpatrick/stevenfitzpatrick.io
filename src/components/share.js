import { h, Component } from 'preact';

import TwitterLogo from '../assets/svg/twitter';
import LinkedInLogo from '../assets/svg/linkedin';
import { SVGIcon } from './common';

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

  renderShareLink = (shareSvg, shareTitle, onClick) => (
    <button class={`button--${shareTitle.toLowerCase()}`} onClick={onClick}>
      <SVGIcon glyph={shareSvg} />
      <span>{shareTitle}</span>
    </button>
  );

  render({ title }) {
    const url = window.location.href;
    return (
      <section class="blog__share">
        <h4>
          Share this page<span>.</span>
        </h4>
        {this.renderShareLink(TwitterLogo, 'Twitter', this.shareTwitter(url, title))}
        {this.renderShareLink(LinkedInLogo, 'LinkedIn', this.shareLinkedIn(url, title))}
      </section>
    );
  }
}

export default Share;
