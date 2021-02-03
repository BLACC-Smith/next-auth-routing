import nookies from 'nookies';
import { verifyIdToken } from './firebaseAdmin';

export const checkNookies = async (context) => {
	try {
		const cookies = nookies.get(context);
		const token = await verifyIdToken(cookies.token);
		return { props: { token } };
	} catch (error) {
		return { props: { error: true } };
	}
};
