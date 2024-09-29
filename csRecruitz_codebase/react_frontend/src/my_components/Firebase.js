import firebase  from "firebase/app";
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import "firebase/storage";
//import {getStorage} from "firebase/storage";


//const firebase = require('firebase')
//require('firebase/storage')

const firebaseConfig = {
  apiKey: "AIzaSyB-fztweXHBQfBImJlB5CO6QucxdD5-cxg",
  authDomain: "csrecruitz-fd59e.firebaseapp.com",
  projectId: "csrecruitz-fd59e",
  storageBucket: "csrecruitz-fd59e.appspot.com",
  messagingSenderId: "128345867428",
  appId: "1:128345867428:web:b37d6093a800a24e5e5231",
  measurementId: "G-1TB35SE723"
};

firebase.initializeApp(firebaseConfig)

//const ref=firebase.storage().ref();
const storage=firebase.storage();
export { storage,firebase as default};