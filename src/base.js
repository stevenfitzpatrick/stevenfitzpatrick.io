import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyAYBgORfDq6ptpb9k6jE3N5UHonW75EYPE',
  authDomain: 'stevenfitzpatrick-5181b.firebaseapp.com',
  databaseURL: 'https://stevenfitzpatrick-5181b.firebaseio.com'
});

const database = firebase.database();

export default database;
