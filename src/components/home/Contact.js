import { h } from 'preact';
import styles from './style';
import cx from 'classnames';
import CloseIcon from '../../assets/svg/close';
import SocialIcons from 'components/common/SocialIcons';

export default ({ hideAboutMe, displayShowMe }) => (
  <div class={cx(styles.aboutme, displayShowMe && styles['aboutme--visible'])}>
    <div
      tabIndex="-1"
      role="button"
      aria-label="Close Me"
      class={styles.aboutme__close}
      onClick={hideAboutMe}
      onKeyDown={hideAboutMe}
    >
      <svg>
        <use xlinkHref={`#${CloseIcon.id}`} />
      </svg>
    </div>
    <div class={styles.aboutme__moon}>
      <ul>
        <li />
        <li />
        <li />
        <li />
      </ul>
    </div>

    <div class={styles.aboutme__content}>
      <h4>
				How to contact me<span>.</span>
      </h4>
      <p>
				Hi there, if you have any questions about me, this site or any projects you need a hand with
				feel free to contact me on any of the links below !
      </p>
      <div class={styles.aboutme__links}>
        <SocialIcons />
      </div>
      <a href="#0" onClick={hideAboutMe} class={cx(styles.closeme, 'text--blue')}>
				Close me
      </a>
    </div>
  </div>
);
