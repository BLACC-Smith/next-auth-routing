const admin = require('firebase-admin');
const serviceAccount = require('../service_account.json');

export const verifyIdToken = async (token) => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: 'https://myExample.firebaseio.com',
		});
	}
	return admin
		.auth()
		.verifyIdToken(token)
		.catch((error) => {
			throw error;
		});
};
