// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNXKXNRqgDRf7Fqis5HHxOdtbDSzmunxY",
  authDomain: "to-do-list-app-2-8e164.firebaseapp.com",
  projectId: "to-do-list-app-2-8e164",
  storageBucket: "to-do-list-app-2-8e164.appspot.com",
  messagingSenderId: "987175720676",
  appId: "1:987175720676:web:b7bbeaafde6b59ab7a7ef1",
  measurementId: "G-2N1PKDGHCN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()