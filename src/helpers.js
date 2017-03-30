const slugifyPath = (path, prefix = '') =>
  `${prefix}${encodeURI(path
      .replace(' ?', '')
      .split(' ')
      .map(str => str.toLowerCase())
      .join('-'))}`;

export { slugifyPath };
