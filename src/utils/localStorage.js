/**
 * Save Key, Value to Localstorage
 * @param {string} key
 * @param {object} value
 */
function saveLocalStorage(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

/**
 * Fetch value from localstorage
 * @param {string} key
 */
function fetchLocalStorage(key) {
  const data = localStorage.getItem(key);
  debugger; //eslint-disable-line
  return data ? JSON.parse(data) : null;
}

export { saveLocalStorage, fetchLocalStorage };
