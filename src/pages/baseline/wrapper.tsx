import { useAuth } from '../../lib/providers/auth';
import AutoData from './autoData';
import Navigation from './navigation';

export default function Wrapper( { children } ) {
	const user = useAuth();
	
	return (
		<Navigation>
			{user?.emailVerified && <AutoData/>}
			{children}
		</Navigation>
	);
}
