import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";

import {
  useAuthStore
} from "src/stores/auth.store";


export default function useFirebaseAuth() {

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = result._tokenResponse.oauthIdToken;
        // The signed-in user info.
        const user = result.user;
        const authStore = useAuthStore();
        authStore.loginWithGoogle(accessToken);

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }


  const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    provider.addScope('email');
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        //const authStore = useAuthStore();
        //authStore.loginWithFacebook(accessToken);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }

  return {
    loginWithGoogle,
    loginWithFacebook
  };
}
