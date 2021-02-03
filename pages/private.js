import { auth } from '../lib/firebaseClient';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { checkNookies } from '../lib';

export default function Private({ token, error }) {
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
	return await checkNookies(context);
}
