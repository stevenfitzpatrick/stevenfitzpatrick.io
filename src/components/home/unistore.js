import { getMostRecentCommit } from '../../clients/api';
import { formatPushEvent, fetchLocalStorage, saveLocalStorage } from '../../utils';

const GITHUB_LS_KEY = 'githubCommit';

function updateGithubState(state, commit) {
  return {
    github: {
      ...state.github,
      commit,
      loading: false,
      error: false
    }
  };
}

function updateGithubStateLoading(state) {
  return {
    github: {
      ...state.github,
      loading: true,
      error: false
    }
  };
}

function updateGithubStateError(state) {
  return {
    github: {
      ...state.github,
      loading: false,
      error: true
    }
  };
}

export default store => ({
  async fetchGithubCommit(state) {
    try {
      store.setState(updateGithubStateLoading(state));
      const commit = await getMostRecentCommit();
      const formattedCommit = formatPushEvent(commit);
      saveLocalStorage(GITHUB_LS_KEY, formattedCommit);
      store.setState(updateGithubState(state, formattedCommit));
    } catch (e) {
      // Try fetch from localstorage if fails
      const saved = fetchLocalStorage(GITHUB_LS_KEY);
      if (saved) store.setState(updateGithubState(state, saved));
      else store.setState(updateGithubStateError(state));
    }
  }
});
