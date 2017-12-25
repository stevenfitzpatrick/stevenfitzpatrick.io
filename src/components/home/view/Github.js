import { h } from 'preact';
import cx from 'classnames';

import { SVGIcon, Loader } from '../../common';
import GithubIcon from '../../../assets/svg/github.svg';
import styles from './style';

function Github({ github, loading, error }) {
  if (loading) return <Loader class={styles.github} type="github" />;
  if (error) return <div>error</div>;
  if (github)
    return (
      <div class={cx('row', 'centered')}>
        <SVGIcon glyph={GithubIcon} type="icon--big" />
        <div class={cx('column', 'github')}>
          <strong>
            <a
              href={github.commit.url}
              class="link--readmore"
              target="_blank"
              rel="noopener noreferrer"
              alt="Commit message"
            >
              {github.commit.message}
            </a>
          </strong>
          <a alt="Repo" href={github.repo.url} target="_blank" rel="noopener noreferrer">
            {github.repo.name}
          </a>
          <smaller class={styles.gh__date}> Committed {github.date}</smaller>
        </div>
      </div>
    );

  return null;
}

export default Github;
