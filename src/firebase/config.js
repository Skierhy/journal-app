// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCnIHQDAGUPRe_9NBuYcRKygZBuD8jPNpo',
	authDomain: 'react-curso-8a0b4.firebaseapp.com',
	projectId: 'react-curso-8a0b4',
	storageBucket: 'react-curso-8a0b4.appspot.com',
	messagingSenderId: '1038625044237',
	appId: '1:1038625044237:web:dbcd0f9f4d19cd72256244',
	measurementId: 'G-VFG4MEP8MY',
};
// const analytics = getAnalytics(app);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// parte de la autenticación
export const FirebaseAuth = getAuth(FirebaseApp);
// parte de la base de datos
export const FirebaseDB = getFirestore(FirebaseApp);
