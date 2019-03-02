import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyC2xFZGoue4Hhv79TNfd8aPLuerr6iT55c",
    authDomain: "shoppinglistplusplus-nsa.firebaseapp.com",
    databaseURL: "https://shoppinglistplusplus-nsa.firebaseio.com",
    projectId: "shoppinglistplusplus-nsa",
    storageBucket: "shoppinglistplusplus-nsa.appspot.com",
    messagingSenderId: "845516663781"
};
firebase.initializeApp(config);

export default firebase;