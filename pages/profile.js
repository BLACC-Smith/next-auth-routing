import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../lib/firebaseClient';
import { checkNookies } from '../lib';
import { useAuth } from '../hooks/useAuth';

export default function Profile({ token, error }) {
	const { user } = useAuth();
	const router = useRouter();

	const signout = async () => {
		await auth.signOut();
		router.push('/');
	};

	useEffect(() => {
		error && router.push('/login');
	}, []);

	if (!user) return <div>Loading...</div>;
	return (
		<>
			<div>Welcome back, {token.email.split('@')[0]}!</div>
			<button onClick={signout}>Signout</button>
		</>
	);
}

export async function getServerSideProps(context) {
	return await checkNookies(context);
}
