import * as firebase from 'firebase/app';
import database from 'firebase/database';

firebase.initializeApp({
  authDomain: 'stevenfitzpatrick-5181b.firebaseapp.com',
  databaseURL: 'https://stevenfitzpatrick-5181b.firebaseio.com'
});

export default firebase;
