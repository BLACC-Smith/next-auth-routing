const admin = require('firebase-admin');
const serviceAccount = require('../service_account.json');

export const verifyIdToken = async (token) => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: 'chatty-rn',
				clientEmail:
					'firebase-adminsdk-yi8a2@chatty-rn.iam.gserviceaccount.com',
				privateKey: process.env.PRIVATE_KEY,
			}),
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
