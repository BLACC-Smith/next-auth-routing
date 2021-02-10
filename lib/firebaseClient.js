import firebase from 'firebase';

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: 'chatty-rn.firebaseapp.com',
	databaseURL: 'https://chatty-rn.firebaseio.com',
	projectId: 'chatty-rn',
	storageBucket: 'chatty-rn.appspot.com',
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { firebase, auth };
