import {
  initializeApp
} from 'firebase/app';
import {
  getMessaging,
  getToken,
  onMessage
} from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyBPognI3dDU_O9KSyFYuYorIHZFiF_kCEM",
  authDomain: "fir-poc-task-ccb18.firebaseapp.com",
  projectId: "fir-poc-task-ccb18",
  storageBucket: "fir-poc-task-ccb18.appspot.com",
  messagingSenderId: "117176430191",
  appId: "1:117176430191:web:8712f9aa294f0f4f93679a"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey: 'BOwquXNxjHKlY5TVZUyLrwcG2sXaLLjWFV_q4lOJJ0CsFDBShj6exR34sdumFM8XZS9FdhQPT15yf4BT9yUbgio'
  }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });