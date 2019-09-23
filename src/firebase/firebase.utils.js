import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyArWHway63CzzZrxjlbi3cSznC3H9TafFY",
  authDomain: "crown-db-33092.firebaseapp.com",
  databaseURL: "https://crown-db-33092.firebaseio.com",
  projectId: "crown-db-33092",
  storageBucket: "",
  messagingSenderId: "207837096304",
  appId: "1:207837096304:web:50e08deb5cdf87513087b5"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  console.log(snapShot);

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date(); 

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;