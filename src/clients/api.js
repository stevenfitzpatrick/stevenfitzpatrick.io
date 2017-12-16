export const getBookmarks = async () => {
  const body = await fetch('https://stevenfitzpatrick-5181b.firebaseio.com/favourites.json');
  return await body.json();
};

export const getWritings = async () => {
  const body = await fetch('../config.json');
  return await body.json();
};

export const getMostRecentCommit = async () => {
  const body = await fetch('https://api.github.com/users/stevenfitzpatrick/events/public?per_page=1');
  return await body.json();
};
