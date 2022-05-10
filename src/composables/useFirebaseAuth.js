import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInAnonymously,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { Notify } from "quasar";

import { useAuthStore } from "src/stores/auth.store";

export default function useFirebaseAuth() {
  const loginAnonymously = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log("signedIN");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

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
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        Notify.create({
          message: errorMessage,
          icon: "warning",
          position: "bottom",
          color: "negative",
        });
      });
  };

  const loginWithFacebook = () => {
    const authStore = useAuthStore();
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        authStore.loginWithFacebook(accessToken);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        if (
          errorCode == "auth/account-exists-with-different-credential" &&
          credential &&
          credential.accessToken
        ) {
          authStore.loginWithFacebook(credential.accessToken);
        } else {
          Notify.create({
            message: errorMessage,
            icon: "warning",
            position: "bottom",
            color: "negative",
          });
        }
      });
  };

  return {
    loginAnonymously,
    loginWithGoogle,
    loginWithFacebook,
  };
}
