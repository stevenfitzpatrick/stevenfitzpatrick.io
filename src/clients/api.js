export const getBookmarks = async () => {
  const body = await fetch(
    'https://stevenfitzpatrick-5181b.firebaseio.com/favourites.json'
  );
  return await body.json();
};
