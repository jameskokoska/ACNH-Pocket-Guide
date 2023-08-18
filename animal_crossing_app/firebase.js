import { initializeApp, getApps } from "firebase/app"
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from './firebaseConfig'

let app;

if (getApps().length===0) {
  app = initializeApp(firebaseConfig);
}

export default app;