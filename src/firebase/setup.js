// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYvOlS3e4W7dso4e5SoemzTD1O5QsNd2E",
  authDomain: "telemoniwp.firebaseapp.com",
  projectId: "telemoniwp",
  storageBucket: "telemoniwp.firebasestorage.app",
  messagingSenderId: "930176175470",
  appId: "1:930176175470:web:7ec87fd90f01e03695857f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);
 export default auth;