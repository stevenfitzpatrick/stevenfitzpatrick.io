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

// Future Offline Handling
// bindEvents() {
//   window.addEventListener('offline', this.onOfflineStatus)
//   window.addEventListener('online', this.onOnlineStatus)
// }

// onOfflineStatus() {
//   this.showOfflineBanner()
// }

// onOnlineStatus() {
//   this.hideOfflineBanner()
// }
// if (navigator.onLine === false) {
//   debugger;
// }

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/sw.js');

  const loadAnalytics = () => {
    import('./analytics').then(page => page.init());
  };
  loadAnalytics();
}
