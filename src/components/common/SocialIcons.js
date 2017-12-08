import { h } from 'preact';

import { SVGIcon } from './index';
import TwitterLogo from '../../assets/svg/twitter';
import EmailLogo from '../../assets/svg/email';
import LinkedInLogo from '../../assets/svg/linkedin';

const SOCIAL_LIST = [
  {
    href: '//twitter.com/Fitzy_Longhorn',
    type: 'twitter',
    glyph: TwitterLogo
  },
  {
    href: '//ie.linkedin.com/in/steven-fitzpatrick-a7a6b016',
    type: 'linkedin',
    glyph: LinkedInLogo
  },
  {
    href: 'mailto:steven.fitzpatrick1985@gmail.com',
    type: 'email',
    glyph: EmailLogo
  }
];

const SocialIcon = ({ glyph, type, ...props }) => (
  <a {...props}>
    <span class="hide--span">{type}</span>
    <SVGIcon type={type} glyph={glyph} />
  </a>
);

export default () => <div>{SOCIAL_LIST.map(icon => <SocialIcon {...icon} />)}</div>;
