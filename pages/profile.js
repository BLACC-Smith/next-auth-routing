import nookies from 'nookies';
import { useRouter } from 'next/router';
import { verifyIdToken } from '../lib/firebaseAdmin';
import { useEffect } from 'react';
import { auth } from '../lib/firebaseClient';

export default function Profile({ email, error }) {
	const router = useRouter();

	const signout = async () => {
		await auth.signOut();
		router.push('/');
	};

	useEffect(() => {
		if (error) router.push('/login');
	}, []);

	if (!email) return <div>Loading...</div>;
	return (
		<>
			<div>Welcome back, {email.split('@')[0]}!</div>
			<button onClick={signout}>Signout</button>
		</>
	);
}

export async function getServerSideProps(context) {
	try {
		const cookies = nookies.get(context);
		const { email } = await verifyIdToken(cookies.token);
		return { props: { email } };
	} catch (error) {
		return { props: { error: true } };
	}
}
