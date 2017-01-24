import * as firebase from 'firebase/app';
import firebase_database from 'firebase/database';

firebase.initializeApp({
  apiKey: 'AIzaSyAYBgORfDq6ptpb9k6jE3N5UHonW75EYPE',
  authDomain: 'stevenfitzpatrick-5181b.firebaseapp.com',
  databaseURL: 'https://stevenfitzpatrick-5181b.firebaseio.com'
});

const database = firebase.database();

export default database;
