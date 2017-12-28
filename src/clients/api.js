export const getBookmarks = async () => {
  const body = await fetch('https://stevenfitzpatrick-5181b.firebaseio.com/favourites.json');
  return await body.json();
};

export const getWritings = async () => {
  const body = await fetch('../config.json');
  return await body.json();
};

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export const getMostRecentCommit = async () => {
  const body = await fetch('https://api.github.com/users/stevenfitzpatrick/events/public?per_page=3');
  const results = await body.json();
  await sleep(300);

  //Filter only for Push Events
  return results.find(item => item.type === 'PushEvent');
};
