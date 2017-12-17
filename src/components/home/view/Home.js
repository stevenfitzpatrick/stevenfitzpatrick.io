import { h } from 'preact';
import cx from 'classnames';

import { IntersectionObserver, SVGIcon } from '../../common';
import ContactIcon from '../../../assets/svg/speech-bubble.svg';
import Loading from '../../loading';
import Github from './Github';
import styles from './style';

const activityText =
  'Currently working full-time but always looking for interesting projects to work on. \n Technology wise I am currently learning — React 16, CSS Grid and Jest.';

function Home({ showAboutMe, toggleAboutMe, Contact, getLatestGithubCommit, github }) {
  return (
    <div>
      <section class={styles.home}>
        <h4>Hello & Welcome !</h4>

        <h2>I’m Steven Fitzpatrick.</h2>
        <h5>
          <span class="underline">I’m</span> a Front-End Developer &
          <span class="other-skills popDown">Problem Solver</span>
        </h5>
        <button class="button--outline" onClick={toggleAboutMe} aria-label="Contact Me">
          <SVGIcon glyph={ContactIcon} />
          <span>Contact Me</span>
        </button>
        {Contact && <Contact displayShowMe={showAboutMe} hideAboutMe={toggleAboutMe} />}
      </section>
      <section class={cx(styles.container, styles.aboutme)}>
        <div class="breakout-wrapper">
          <h3>
            About <span>me</span>
          </h3>
          <p>
            I&rsquo;m a <strong>passionate</strong> front-end developer based in Dublin, Ireland with full-stack
            experience. When it comes to coding I like to keep it simple, performant and functional.
          </p>
          <p>
            I enjoy working with the cutting-edge tools and frameworks of the front-end
            ecosystem&#8202;&mdash;&#8202;and excited about where the industry is going.
          </p>
        </div>
      </section>
      <IntersectionObserver
        onInView={getLatestGithubCommit}
        render={() => (
          <section class={cx(styles.container, styles.activity)}>
            <div class="breakout-wrapper">
              <h3>
                What am I upto <span>?</span>
              </h3>
              <p>{activityText}</p>
              <h5>Check my latest commit in Github :</h5>
              {github ? <Home.Github github={github} /> : <Loading />}
            </div>
          </section>
        )}
      />
    </div>
  );
}

Home.Github = Github;

export default Home;
