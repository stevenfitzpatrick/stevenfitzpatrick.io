import { h, Component } from 'preact';
import GithubLogo from '../../assets/svg/github.svg';
import TwitterLogo from '../../assets/svg/twitter.svg';
import EmailLogo from '../../assets/svg/email.svg';
import LinkedInLogo from '../../assets/svg/linkedin.svg';
import cx from 'classnames';

import style from './style.scss';
const test = style;

const FooterIcon = ({ glyph, type, ...props }) => (
  <a {...props}>
    <svg class={cx(style.icon, style[type])}>
      <use xlinkHref={glyph} />
    </svg>
  </a>
);

export default class Footer extends Component {
  render() {
    return (
      <footer class={style.footer}>
        <div class={style.footer__content}>
          <FooterIcon
            href="//twitter.com/Fitzy_Longhorn"
            glyph={TwitterLogo}
            type="twitter"
          />
          <FooterIcon
            href="//github.com/stevenfitzpatrick/stevenfitzpatrick.io"
            glyph={GithubLogo}
            type="github"
          />
          <FooterIcon
            href="//ie.linkedin.com/in/steven-fitzpatrick-a7a6b016"
            glyph={LinkedInLogo}
            type="linkedin"
          />
          <FooterIcon
            href="mailto:steven.fitzpatrick1985@gmail.com"
            glyph={EmailLogo}
            type="email"
          />
        </div>
        <div class={style.footer__acknowledgement} />
      </footer>
    );
  }
}
