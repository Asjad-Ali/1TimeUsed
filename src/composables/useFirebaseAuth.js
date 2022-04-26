import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
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

  return {
    loginWithGoogle
  };
}
