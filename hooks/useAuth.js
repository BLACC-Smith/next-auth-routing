/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../lib/firebaseClient';
import nookies from 'nookies';

const authContext = createContext();

export function AuthProvider({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

const useProvideAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		return auth.onIdTokenChanged(async (user) => {
			if (!user) {
				setUser(null);
				nookies.set(undefined, 'token', '', {});
				return;
			}
			const token = await user.getIdToken();
			setUser(user);
			nookies.set(undefined, 'token', token, {});
		});
	}, []);

	return {
		user,
	};
};
