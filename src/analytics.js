/*global ga*/

/**
 * Init Code for Google Analytics, Lazy Loaded
 */

export const init = () => {
  window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

  ga('create', 'UA-89923476-1', 'auto');
  ga('set', 'transport', 'beacon');
  ga('send', 'pageview');
};
