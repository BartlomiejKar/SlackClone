import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyB7ZnIk_CMib3yVcjG-bWm97odmkvLHB0k",
    authDomain: "slack-3c5f6.firebaseapp.com",
    projectId: "slack-3c5f6",
    storageBucket: "slack-3c5f6.appspot.com",
    messagingSenderId: "77012914442",
    appId: "1:77012914442:web:f97f127f2c8caf956feaf3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;