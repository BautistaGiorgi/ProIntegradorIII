import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAGwqAkeR7SH0aK5bfDmnpaaLUaGfgjyLQ",
    authDomain: "proyectoiii-70946.firebaseapp.com",
    projectId: "proyectoiii-70946",
    storageBucket: "proyectoiii-70946.appspot.com",
    messagingSenderId: "1021361730659",
    appId: "1:1021361730659:web:9264d2135ac2f778467456"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();