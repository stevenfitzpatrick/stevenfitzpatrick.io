/**
 * Slugify String Path
 * @param {string} path path of content
 * @param {string} prefix section name i.e. blogs
 */
export const slugifyPath = (path, prefix = '') =>
  `${prefix}${encodeURI(
    path
      .replace(' ?', '')
      .split(' ')
      .map(str => str.toLowerCase())
      .join('-')
  )}`;

/**
 * Map Object List to Array
 * @param {object} input
 */
export const mapObjectToArray = input =>
  Object.keys(input).reduce((list, item) => [...list, input[item]], []);

/**
 *
 * @param {*} bookmarks
 */
export const getTags = bookmarks => {
  const tags = bookmarks.map(item => [...item.tags]).sort();
  return [].concat(...tags);
};

/**
 * Count number of occurences of keys in object
 * @param {*} input
 */
export const countKeys = input =>
  input.reduce((prev, next) => {
    if (prev[next]) {
      prev[next].count++;
    } else {
      prev[next] = {
        text: next,
        count: 1
      };
    }
    return prev;
  }, {});
