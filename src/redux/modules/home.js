// Actions
const SHOW_ABOUT_ME = 'home/SHOW_ABOUT_ME';
const HIDE_ABOUT_ME = 'home/HIDE_ABOUT_ME';

const initialState = {
  displayShowMe: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_ABOUT_ME:
      return {
        ...state,
        displayShowMe: true
      };
    case HIDE_ABOUT_ME:
      return {
        ...state,
        displayShowMe: false
      };
    default:
      return state;
  }
}

export function showAboutMe() {
  return { type: SHOW_ABOUT_ME };
}

export function hideAboutMe() {
  return { type: HIDE_ABOUT_ME };
}
