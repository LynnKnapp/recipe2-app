import firebase from 'firebase/app'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBRrOVE0R9oTbgYIxnPmk7mEiX6jnGq15U",
    authDomain: "recipe-app-b37df.firebaseapp.com",
    databaseURL: "https://recipe-app-b37df.firebaseio.com",
    projectId: "recipe-app-b37df",
    storageBucket: "recipe-app-b37df.appspot.com",
    messagingSenderId: "146760513283",
    appId: "1:146760513283:web:a56760b429a8e4ba069b36",
    measurementId: "G-M8ZDWLHRRY"
  }
  
  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage();

  export {
      storage, firebaseConfig as default
  }
