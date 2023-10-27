import AsyncButton from '@/components/loaders/asyncButton';
import type { User } from 'firebase/auth';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { pick } from 'remeda';
import firebaseClientApp from '../../firebase/client';
import pget from '../../helpers/pget';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mainActions } from '../../store/reducers/mainReducer';

const auth = getAuth(firebaseClientApp);

const AuthContext = createContext<Partial<User>>(undefined);
AuthContext.displayName = 'Auth';

export default function AuthProvider({ children }: { children: ReactNode }) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();
	const savedUser = useAppSelector(pget('main.user'));
	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (loading || error) return;
		dispatch(
			mainActions.setUser(
				user
					? pick(user, [
							'displayName',
							'email',
							'emailVerified',
							'isAnonymous',
							'phoneNumber',
							'photoURL',
							'providerId',
							'uid',
							'refreshToken',
					  ])
					: null,
			),
		);

		if (!user || user.emailVerified) return;
		const key = enqueueSnackbar('Email Not Verified', {
			variant: 'warning',
			persist: true,
			action: (
				<AsyncButton onClick={() => sendEmailVerification(user)}>Resend Email</AsyncButton>
			),
		});
		return () => closeSnackbar(key);
	}, [user]);

	useEffect(() => {
		if (!error) return;
		enqueueSnackbar(`Error: ${error.message}`, { variant: 'warning' });
	}, [error]);

	return <AuthContext.Provider value={savedUser}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}

export function withAuth(Component) {
	return (props) => (
		<AuthContext.Consumer>{(user) => <Component user={user} {...props} />}</AuthContext.Consumer>
	);
}
