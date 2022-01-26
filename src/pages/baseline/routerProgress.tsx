import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Progress from '../../components/loaders/progress';
import useEventListener from '../../hooks/useEventListener';

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
	
	useEventListener( router.events, 'routeChangeStart', routeChangeStart );
	useEventListener( router.events, 'routeChangeComplete', routeChangeEnd );
	useEventListener( router.events, 'routeChangeError', routeChangeEnd );
	
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
