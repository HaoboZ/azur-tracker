import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Progress from '../../components/loaders/progress';
import useEventEffect from '../../hooks/useEventEffect';

export default function RouterProgress( { showOnShallow = true }: {
	showOnShallow?: boolean
} ) {
	const router = useRouter();
	
	const [ key, setKey ] = useState( 0 );
	const [ isActive, setIsActive ] = useState( false );
	
	const routeChangeStart = ( _, { shallow } ) => {
		if ( !shallow || showOnShallow ) {
			setIsActive( true );
			setKey( ( key ) => key + 1 );
		}
	};
	
	const routeChangeEnd = ( _, { shallow } ) => {
		if ( !shallow || showOnShallow ) {
			setIsActive( false );
		}
	};
	
	useEventEffect( router.events, {
		name    : 'routeChangeStart',
		listener: routeChangeStart
	}, [] );
	useEventEffect( router.events, {
		name    : 'routeChangeComplete',
		listener: routeChangeEnd
	}, [] );
	useEventEffect( router.events, {
		name    : 'routeChangeError',
		listener: routeChangeEnd
	}, [] );
	
	return (
		<Progress key={key} isLoading={isActive}>
			{( progress ) => (
				<LinearProgress
					variant='determinate'
					color='secondary'
					value={progress * 100}
					sx={{ position: 'absolute', width: '100%' }}
				/>
			)}
		</Progress>
	);
}
