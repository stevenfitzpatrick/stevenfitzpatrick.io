// Add Google Analytics
/*global ga*/

export const init = () => {
  // Initialize the command queue in case analytics.js hasn't loaded yet.
  window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

  ga('create', 'UA-89923476-1', 'auto');
  ga('set', 'transport', 'beacon');
  ga('send', 'pageview');
};
