import { h } from 'preact';

import LoadingSVG from '../assets/svg/loading.svg';

export default () => (
  <section class="loading">
    <svg>
      <use xlinkHref={`#${LoadingSVG.id}`} />
    </svg>
  </section>
);
