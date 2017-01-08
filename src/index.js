import { h, render } from 'preact';
import style from './styles';

let root;
function init() {
    let App = require('./components/app').default;
    root = render(<App />, document.body, root);
}

init();

if (process.env.environment === 'dev') {
    require('preact/devtools');
}

if ('serviceWorker' in navigator && process.env.environment === 'prod') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}

