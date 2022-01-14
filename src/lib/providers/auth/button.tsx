import { signOut } from 'firebase/auth';
import AsyncLoadingButton from '../../../components/asyncLoadingButton';
import { auth } from '../../firebase/client';
import useEventEffect from '../../hooks/useEventEffect';
import { useEvents } from '../event';
import { useModal } from '../modal';
import { useAuth } from './index';
import LoginModal from './login';

export default function useAuthButton() {
	const user = useAuth();
	const events = useEvents();
	const { showModal } = useModal( LoginModal, { maxWidth: 'xs' } );
	
	useEventEffect( events, {
		name    : 'showAuth',
		listener: () => showModal()
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
