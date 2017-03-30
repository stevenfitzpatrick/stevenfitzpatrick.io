import * as firebase from 'firebase/app';
import database from 'firebase/database';

firebase.initializeApp({
  databaseURL: 'https://stevenfitzpatrick-5181b.firebaseio.com'
});

export default firebase;
