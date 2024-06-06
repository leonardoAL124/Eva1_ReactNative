// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP3ns3i_HM8GbQh2jafhDIDa6Uyjj7yHk",
  authDomain: "evaluacion1-50bbf.firebaseapp.com",
  projectId: "evaluacion1-50bbf",
  storageBucket: "evaluacion1-50bbf.appspot.com",
  messagingSenderId: "899688364658",
  appId: "1:899688364658:web:5b73c0a578597729d420eb"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});