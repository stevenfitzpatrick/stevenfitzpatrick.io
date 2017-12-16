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
export const mapObjectToArray = input => Object.keys(input).reduce((list, item) => [...list, input[item]], []);

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

function prettyDate(time) {
  let date = new Date((time || '').replace(/-/g, '/').replace(/[TZ]/g, ' ')),
    diff = (new Date().getTime() - date.getTime()) / 1000,
    dayDiff = Math.floor(diff / 86400);

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) return;

  return (
    (dayDiff === 0 &&
      ((diff < 60 && 'just now') ||
        (diff < 120 && '1 minute ago') ||
        (diff < 3600 && `${Math.floor(diff / 60)} minutes ago`) ||
        (diff < 7200 && '1 hour ago') ||
        (diff < 86400 && `${Math.floor(diff / 3600)} hours ago`))) ||
    (dayDiff === 1 && 'Yesterday') ||
    (dayDiff < 7 && `${dayDiff} days ago`) ||
    (dayDiff < 31 && `${Math.ceil(dayDiff / 7)} weeks ago`)
  );
}

/**
 * Format Github API Push Event for view
 * @param {object} commit
 */
export const formatPushEvent = ({ created_at: createdAt, repo, payload: { commits } } = {}) => ({
  date: prettyDate(createdAt),
  repo: {
    url: repo.url.replace('api.', '').replace('/repos', ''),
    name: repo.name.replace('stevenfitzpatrick/', '')
  },
  commit: {
    url: commits[0].url
      .replace('api.', '')
      .replace('/repos', '')
      .replace('commits', 'commit'),
    message: commits[0].message
  }
});
