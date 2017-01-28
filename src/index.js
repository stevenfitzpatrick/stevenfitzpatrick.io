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

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });

  //Add Google Analytics
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]; a.defer = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'UA-89923476-1', 'auto');
  ga('send', 'pageview');
}
