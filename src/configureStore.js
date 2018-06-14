import { createStore, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app';
//import { reduxFirestore } from 'redux-firestore';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import rootReducer from './reducers';

const firebaseConfig = {
  apiKey: "AIzaSyBvU_wixtXMfP2H6ZvRxbSDfACpA2jmVEI",
  authDomain: "unwine-fb054.firebaseapp.com",
  databaseURL: "https://unwine-fb054.firebaseio.com",
  projectId: "unwine-fb054",
  storageBucket: "unwine-fb054.appspot.com",
  messagingSenderId: "813513892290"
};

const rrfConfig = {
  userProfile: "users",
  profileParamsToPopulate: [
    { child: 'role', root: 'roles' }
  ],
  profileFactory: user =>{ 
    return ({
    email: user.user.email || user.user.providerData[0].email,
    role: 'user',
    providerData: user.user.providerData
  })
}
 /*  useFirestoreForProfile: true */
};

firebase.initializeApp(firebaseConfig);

//const firestore = firebase.firestore();
//const settings = { timestampsInSnapshots: true};
//firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  /* reduxFirestore(firebase) */
)(createStore);

export default function configureStore () {
  const store = createStoreWithFirebase(rootReducer, {});
  return store
}