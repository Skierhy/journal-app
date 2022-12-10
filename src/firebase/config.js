// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
	VITE_APIKEY,
	VITE_AUTHDOMAIN,
	VITE_PROJECTID,
	VITE_STORAGEBUCKET,
	VITE_MESSAGINGSENDERID,
	VITE_APPID,
	VITE_MEASUREMENTID,
} = getEnvironments();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Dev/Prod
// const firebaseConfig = {
// apiKey: 'AIzaSyCnIHQDAGUPRe_9NBuYcRKygZBuD8jPNpo',
// authDomain: 'react-curso-8a0b4.firebaseapp.com',
// projectId: 'react-curso-8a0b4',
// storageBucket: 'react-curso-8a0b4.appspot.com',
// messagingSenderId: '1038625044237',
// appId: '1:1038625044237:web:dbcd0f9f4d19cd72256244',
// measurementId: 'G-VFG4MEP8MY',
// };
// const analytics = getAnalytics(app);

// Testing
// const firebaseConfig = {
// 	apiKey: 'AIzaSyBojmUb1VlLN8jpzAXB7mufUXhXM4h7H04',
// 	authDomain: 'react-testing-21d28.firebaseapp.com',
// 	projectId: 'react-testing-21d28',
// 	storageBucket: 'react-testing-21d28.appspot.com',
// 	messagingSenderId: '984296333966',
// 	appId: '1:984296333966:web:a0399a70c9a795becf9fdf',
// };

const firebaseConfig = {
	apiKey: VITE_APIKEY,
	authDomain: VITE_AUTHDOMAIN,
	projectId: VITE_PROJECTID,
	storageBucket: VITE_STORAGEBUCKET,
	messagingSenderId: VITE_MESSAGINGSENDERID,
	appId: VITE_APPID,
	measurementId: VITE_MEASUREMENTID,
};

console.log(firebaseConfig);
// ver variables de entorno
// console
// console.log(import.meta.env);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// parte de la autenticación
export const FirebaseAuth = getAuth(FirebaseApp);
// parte de la base de datos
export const FirebaseDB = getFirestore(FirebaseApp);
