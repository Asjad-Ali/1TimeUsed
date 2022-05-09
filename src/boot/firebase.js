import {
  initializeApp
} from "firebase/app";
// import {
//   getAnalytics
// } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD___g4E1-hrejER1ucPQAfoMBJ1bRlXQ4",
  authDomain: "onetimeused-945b6.firebaseapp.com",
  projectId: "onetimeused-945b6",
  storageBucket: "onetimeused-945b6.appspot.com",
  messagingSenderId: "605433633770",
  appId: "1:605433633770:web:526bc5614a739e632bf093",
  measurementId: "G-QPHZE2Y0VT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const db = getFirestore(app);



//Authenticate user
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in", user);
    const uid = user.uid;
    // ...
  } else {
    console.log('Logged Out')
    signInAnonymously(auth)
      .then(() => {
        console.log('signedIN')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }
});


const firebase = {
  app,
}

export default firebase;
