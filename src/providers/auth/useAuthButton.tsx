import AsyncButton from '@/components/loaders/asyncButton';
import { getAuth, signOut } from 'firebase/auth';
import firebaseClientApp from '../../firebase/client';
import { useEvents } from '../events';
import { useAuth } from './index';

const auth = getAuth(firebaseClientApp);

export default function useAuthButton() {
	const events = useEvents();
	const user = useAuth();

	return user ? (
		<AsyncButton variant='outlined' color='inherit' onClick={() => signOut(auth)}>
			Sign Out
		</AsyncButton>
	) : (
		<AsyncButton variant='outlined' color='inherit' onClick={() => events.emit('showAuth')}>
			Sign In
		</AsyncButton>
	);
}
