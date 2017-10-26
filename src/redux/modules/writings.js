// Actions
const WRITINGS_FETCH_REQUESTED = 'WRITINGS_FETCH_REQUESTED';
const WRITINGS_FETCH_SUCCEEDED = 'WRITINGS_FETCH_SUCCEEDED';

const initialState = {
  list: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case WRITINGS_FETCH_SUCCEEDED:
      return {
        ...state,
        list: [...state.list, ...action.writings]
      };
    default:
      return state;
  }
}

export function fetchWritings() {
  return { type: WRITINGS_FETCH_REQUESTED };
}
