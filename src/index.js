import { h, render } from 'preact';
import style from './styles';

let root;

function init() {
  console.log(
    '%cThanks for checking out my console at stevenfitzpatrick.io, let me know if any bugs !',
    'color: #d28546;font-size: 16px;font-family: "Segoe UI", Roboto, Ubuntu, Cantarell,sans-serif'
  );
  let App = require('./components/app').default;
  root = render(<App />, document.body, root);
}

init();

if (process.env.NODE_ENV === 'development') {
  require('preact/devtools');
}

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/sw.js');

  const loadAnalytics = () => {
    import('./analytics').then(page => page.init());
  };
  loadAnalytics();
}
