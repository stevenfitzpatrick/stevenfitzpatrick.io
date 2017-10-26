import * as firebase from 'firebase/app';

firebase.initializeApp({
  databaseURL: 'https://stevenfitzpatrick-5181b.firebaseio.com'
});

export default firebase;
