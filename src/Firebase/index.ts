import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    databaseURL: 'https://winsze-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'winsze',
    storageBucket: 'winsze.appspot.com',
    messagingSenderId: '564098727958',
    appId: '1:564098727958:web:3951cf9519225ec0043537'
}
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
