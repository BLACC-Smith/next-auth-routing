import { useEffect, useState } from 'react';
import { auth } from '../lib/firebaseClient';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
	const { user } = useAuth();
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');

	const login = async () => {
		auth
			.signInWithEmailAndPassword(email, pw)
			.then(() => router.push('/'))
			.catch((error) => console.log({ error }));
	};

	useEffect(() => {
		user && router.push('/');
	}, [user]);
	return (
		<>
			<input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
			<input placeholder="Password" onChange={(e) => setPw(e.target.value)} />
			<button onClick={login}>Login</button>
		</>
	);
}
