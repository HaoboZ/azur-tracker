import { Box } from '@mui/material';
import { useNProgress } from '@tanem/react-nprogress';
import React from 'react';
import useLoading from '../../hooks/useLoading';

export default function Progress( { isLoading, delay, children }: {
	isLoading: boolean,
	delay?: number,
	children: ( progress ) => React.ReactNode
} ) {
	const isAnimating = useLoading( isLoading, delay );
	const { isFinished, progress } = useNProgress( { isAnimating } );
	
	return (
		<Box sx={{
			opacity   : isFinished ? 0 : 1,
			transition: ( { transitions } ) => transitions.create( 'opacity' )
		}}>
			{children( progress )}
		</Box>
	);
}
