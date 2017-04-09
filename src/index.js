import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import App from './components/App';
import store from './store';
import style from './styles';

let root;

function init() {
  /*eslint-disable no-console*/
  console.log(
    '%cThanks for checking out my console at stevenfitzpatrick.io, let me know if any bugs !',
    'color: #d28546;font-size: 16px;font-family: "Segoe UI", Roboto, Ubuntu, Cantarell,sans-serif'
  );
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body
  );
}

init();

if (process.env.NODE_ENV === 'development') {
  require('preact/devtools');
}

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  /*eslint-disable compat/compat*/
  navigator.serviceWorker.register('/sw.js');

  const loadAnalytics = () => {
    import('./analytics').then(page => page.init());
  };
  loadAnalytics();
}
