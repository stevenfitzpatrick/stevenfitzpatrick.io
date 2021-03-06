import { h, render } from 'preact';
import { Provider } from 'unistore/preact';
import App from './components/app';
import store from './store/store';
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

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    /*eslint-disable compat/compat*/
    navigator.serviceWorker.register('/service-worker.js');
  });

  const loadAnalytics = () => {
    import(/* webpackChunkName: "chunk-analytics" */ './analytics').then(page =>
      page.init()
    );
  };
  loadAnalytics();
}
