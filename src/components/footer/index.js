import { h } from 'preact';
import TwitterLogo from '../../assets/svg/twitter.svg';
import EmailLogo from '../../assets/svg/email.svg';
import LinkedInLogo from '../../assets/svg/linkedin.svg';
import cx from 'classnames';

import style from './style.scss';

const FooterIcon = ({ glyph, type, ...props }) => (
  <a {...props}>
    <span>{type}</span>
    <svg class={cx('icon', type)}>
      <use xlinkHref={glyph} />
    </svg>
  </a>
);

const Footer = () => (
  <footer class={style.footer}>
    <div class={style.footer__title}>Let’s Stay Connected</div>
    <div class={style.footer__content}>
      <FooterIcon
        href="//twitter.com/Fitzy_Longhorn"
        glyph={TwitterLogo}
        type="twitter"
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
  </footer>
);

export default Footer;
