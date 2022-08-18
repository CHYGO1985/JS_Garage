// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmK4L4bDpDaMmvqBVNeahj7oPmSCOEoAM",
  authDomain: "clone-a3ea2.firebaseapp.com",
  projectId: "clone-a3ea2",
  storageBucket: "clone-a3ea2.appspot.com",
  messagingSenderId: "263884196126",
  appId: "1:263884196126:web:13d00f70baf075ad28a10f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;