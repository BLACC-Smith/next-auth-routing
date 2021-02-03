import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import { auth } from '../lib/firebaseClient';
import { useRouter } from 'next/router';

export default function Home() {
	const { user } = useAuth();
	const router = useRouter();

	const signout = async () => {
		await auth.signOut();
		router.push('/');
	};

	return (
		<>
			<div>{user ? user.uid : 'No user signed in'}</div>
			<Link href="/public">
				<button>Go to public page</button>
			</Link>
			<Link href="/private">
				<button>Go to private page</button>
			</Link>
			{!user && (
				<Link href="/login">
					<button>login</button>
				</Link>
			)}
			{user && <button onClick={signout}>Signout</button>}
		</>
	);
}
