import nookies from 'nookies';
import { auth } from '../lib/firebaseClient';
import { useRouter } from 'next/router';
import { verifyIdToken } from '../lib/firebaseAdmin';
import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Private() {
	const { user } = useAuth();
	const router = useRouter();

	const signout = async () => {
		await auth.signOut();
		router.push('/');
	};

	useEffect(() => {
		setTimeout(() => {
			!user && router.push('/login');
		}, 1000);
	}, []);

	return (
		<>
			<div>This page is server-side rendered!</div>
			<div>Here's a list of private info </div>
			<li>private info 1</li>
			<li>private info 2</li>
			<li>private info 3</li>
			<button onClick={signout}>Signout</button>
			<Link href="/profile">
				<button>View Profile</button>
			</Link>
		</>
	);
}

export async function getServerSideProps(context) {
	try {
		const cookies = nookies.get(context);
		const { uid, email } = await verifyIdToken(cookies.token);
		return { props: { uid, email } };
	} catch (error) {
		return { props: { error: true } };
	}
}
