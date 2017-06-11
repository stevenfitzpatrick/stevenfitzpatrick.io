import { h, Component } from 'preact';
import styles from './style';
import cx from 'classnames';
import CloseIcon from '../../assets/svg/close.svg';
import SocialIcons from 'components/common/SocialIcons';

export default ({ hideAboutMe, displayShowMe }) => (
  <div class={cx(styles.aboutme, displayShowMe && styles['aboutme--visible'])}>
    <div
      tabIndex="-1"
      role="button"
      class={styles.aboutme__close}
      onClick={hideAboutMe}
    >
      <svg>
        <use xlinkHref={CloseIcon} />
      </svg>
    </div>
    <div class={styles.aboutme__moon}>
      <li />
      <li />
      <li />
      <li />
    </div>

    <div class={styles.aboutme__content}>
      <h4>How to contact me<span>.</span></h4>
      <p>
        Hi there, if you have any questions about me, this site or any projects you need a hand with feel free to contact
        me on any of the links below !
      </p>
      <div class={styles.aboutme__links}>
        <SocialIcons />
      </div>
      <a
        href="#0"
        onClick={hideAboutMe}
        class={cx(styles.closeme, 'text--blue')}
      >
        Close me
      </a>
    </div>
    {/*<button onClick={hideAboutMe}>Close me</button>*/}
  </div>
);
