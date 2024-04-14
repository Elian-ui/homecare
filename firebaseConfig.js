import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChY0z9N4u7DG3UTPqNRUt_tdofVxAj3uM",
  authDomain: "esp32-48a28.firebaseapp.com",
  projectId: "esp32-48a28",
  storageBucket: "esp32-48a28.appspot.com",
  messagingSenderId: "194679254560",
  appId: "1:194679254560:web:753e378610e83cdf7f9645",
  databaseURL: "https://esp32-48a28-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export { app };
