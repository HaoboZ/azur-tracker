import { getAuth, signOut } from 'firebase/auth';
import AsyncLoadingButton from '../../../components/asyncLoadingButton';
import firebaseClientApp from '../../../firebase/client';
import useEventListener from '../../../hooks/useEventListener';
import { useEvents } from '../events';
import { useModal } from '../modal';
import { useAuth } from './index';
import LoginModal from './loginModal';

const auth = getAuth( firebaseClientApp );

export default function useAuthButton() {
	const events = useEvents();
	const user = useAuth();
	const { showModal } = useModal();
	
	useEventListener( events, 'showAuth', () => showModal( LoginModal, {
		id      : 'login',
		maxWidth: 'xs'
	} ) );
	
	return user ? (
		<AsyncLoadingButton
			variant='outlined'
			color='inherit'
			onClick={() => signOut( auth )}>
			Sign Out
		</AsyncLoadingButton>
	) : (
		<AsyncLoadingButton
			variant='outlined'
			color='inherit'
			onClick={() => events.emit( 'showAuth' )}>
			Sign In
		</AsyncLoadingButton>
	);
}
