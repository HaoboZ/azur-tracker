import { getAuth, signOut } from 'firebase/auth';
import AsyncLoadingButton from '../../components/asyncLoadingButton';
import { app } from '../../firebase/client';
import useEventEffect from '../../hooks/useEventEffect';
import { useEvents } from '../event';
import { useModal } from '../modal';
import { useAuth } from './index';
import LoginModal from './loginModal';

const auth = getAuth( app );

export default function useAuthButton() {
	const user = useAuth();
	const events = useEvents();
	const { showModal } = useModal();
	
	useEventEffect( events, {
		name    : 'showAuth',
		listener: () => showModal( LoginModal, {
			id      : 'login',
			maxWidth: 'xs'
		} )
	} );
	
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
