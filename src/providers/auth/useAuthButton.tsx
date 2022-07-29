import { getAuth, signOut } from 'firebase/auth';
import dynamic from 'next/dynamic';
import AsyncLoadingButton from '../../components/asyncLoadingButton';
import { app } from '../../firebase/client';
import { useEvents } from '../events';
import { useModal } from '../modal';
import { useAuth } from './index';

const LoginModal = dynamic( () => import( './loginModal' ), { suspense: true } );

const auth = getAuth( app );

export default function useAuthButton() {
	const events = useEvents();
	const user = useAuth();
	const { showModal } = useModal();
	
	useEvents( 'showAuth', () => showModal( LoginModal, {
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
