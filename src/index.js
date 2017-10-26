import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import App from './components/app';
import store from './redux/store';
import './styles';

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

if (
  'serviceWorker' in navigator &&
	process.env.NODE_ENV === 'production'
) {
  /*eslint-disable compat/compat*/
  navigator.serviceWorker.register('/sw.js');

  const loadAnalytics = () => {
		import(/* webpackChunkName: "chunk-analytics" */ './analytics').then(
		  page => page.init()
		);
  };
  loadAnalytics();
}

// Add Check for Offline

window.addEventListener('offline', event => {
  document.body.classList.add('offline');
  console.log('I am offline');
});

window.addEventListener('online', event => {
  document.body.classList.remove('offline');
  console.log('I am online');
});
