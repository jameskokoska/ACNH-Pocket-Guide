import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from './firebaseConfig'

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}

export default app;