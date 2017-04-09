import { bindActionCreators } from 'redux';

export const slugifyPath = (path, prefix = '') =>
  `${prefix}${encodeURI(path
      .replace(' ?', '')
      .split(' ')
      .map(str => str.toLowerCase())
      .join('-'))}`;

export function bindActions(actions) {
  return dispatch => ({
    ...bindActionCreators(actions, dispatch)
  });
}
