import { h } from 'preact';

import LoadingSVG from '../assets/svg/loading';

export default () => (
  <section class="loading">
    <svg>
      <use xlinkHref={`#${LoadingSVG.id}`} />
    </svg>
  </section>
);
