import { h } from 'preact';
import cx from 'classnames';
import styled, { keyframes } from 'styled-components';

import SocialIcons from 'components/common/SocialIcons';
import CloseIcon from '../../../assets/svg/close';
import colors from '../../../styles/colors';
import styles from './style';

const neon = keyframes`
	from {
		filter: drop-shadow(0 0 0 ${colors.primary});
	}

	to {
		filter: drop-shadow(0 0 20px ${colors.primary});
	}
`;

const Vacancy = styled.div`
  border: 2px solid ${colors.primary};
  animation: ${neon} 2.5s alternate infinite ease-in-out;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: white;
  transform: rotate(-2deg);
  letter-spacing: 2px;
  border-radius: 5px;
  margin-bottom: 1rem;
  user-select: none;
`;

export default ({ hideAboutMe, displayShowMe }) => (
  <div class={cx(styles.contact, displayShowMe && styles['contact--visible'])}>
    <div
      role="button"
      aria-label="Close Me"
      class={styles.contact__close}
      onClick={hideAboutMe}
      onKeyDown={hideAboutMe}
    >
      <svg>
        <use xlinkHref={`#${CloseIcon.id}`} />
      </svg>
    </div>
    <div class={styles.contact__moon}>
      <ul>
        <li />
        <li />
        <li />
        <li />
      </ul>
    </div>

    <div class={styles.contact__content}>
      <Vacancy>Vacancy</Vacancy>
      <h4>
        How to contact me<span>.</span>
      </h4>
      <p>
        Hi there, if you have any questions about me, this site or any projects you need a hand with feel free to
        contact me on any of the links below !
      </p>
      <div class={styles.contact__links}>
        <SocialIcons />
      </div>
      <a href="#0" onClick={hideAboutMe} class={cx(styles.closeme, 'text--blue')}>
        Close me
      </a>
    </div>
  </div>
);
