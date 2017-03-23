const slugifyPath = (path, prefix = '') =>
  `${prefix}${encodeURI(path
      .split(' ')
      .map(str => str.toLowerCase())
      .join('-'))}`;

export { slugifyPath };
