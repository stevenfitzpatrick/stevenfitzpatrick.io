import { h } from 'preact';

import TwitterLogo from '../../assets/svg/twitter';
import EmailLogo from '../../assets/svg/email';
import LinkedInLogo from '../../assets/svg/linkedin';
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
    <div class={style.footer__title}>Let’s Stay Connected</div>
    <div class={style.footer__content}>
      <FooterIcon href="//twitter.com/Fitzy_Longhorn" glyph={TwitterLogo} type="twitter" />
      <FooterIcon
        href="//ie.linkedin.com/in/steven-fitzpatrick-a7a6b016"
        glyph={LinkedInLogo}
        type="linkedin"
      />
      <FooterIcon href="mailto:steven.fitzpatrick1985@gmail.com" glyph={EmailLogo} type="email" />
    </div>
  </footer>
);

export default Footer;
