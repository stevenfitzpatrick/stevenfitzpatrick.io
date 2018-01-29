import { h } from 'preact';

import TwitterLogo from '../../assets/svg/twitter.svg';
import EmailLogo from '../../assets/svg/email.svg';
import LinkedInLogo from '../../assets/svg/linkedin.svg';
import GithubLogo from '../../assets/svg/github.svg';
import { SVGIcon } from '../common';

import style from './style.scss';

const FooterIcon = ({ glyph, type, ...props }) => (
  <a {...props}>
    <span>{type}</span>
    <SVGIcon type={type} glyph={glyph} />
  </a>
);

const Footer = () => (
  <footer class={style.footer}>
    <div class={style.footer__wrapper}>
      <div class={style.footer__title}>2018 © Steven Fitzpatrick</div>
      <div class={style.footer__content}>
        <FooterIcon
          href="//twitter.com/Fitzy_Longhorn"
          glyph={TwitterLogo}
          type="twitter"
        />
        <FooterIcon
          href="//github.com/stevenfitzpatrick"
          glyph={GithubLogo}
          type="githublogo"
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
    </div>
  </footer>
);

export default Footer;
