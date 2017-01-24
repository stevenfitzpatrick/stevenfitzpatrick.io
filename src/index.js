import { h, render } from 'preact';

import style from './styles';

let root;

function init() {
  let App = require('./components/app').default;

  root = render(<App />, document.body, root);
}

init();

if (process.env.NODE_ENV === 'development') {
  require('preact/devtools');
}

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
