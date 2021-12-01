import { Box, BoxProps, CircularProgress, CircularProgressProps } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

export default function Loading( { delay = 250, children, containerProps, ...props }: {
	delay?: number,
	children?: ReactNode,
	containerProps?: BoxProps
} & CircularProgressProps ) {
	const [ loading, setLoading ] = useState( false );
	
	useEffect( () => {
		setTimeout( () => setLoading( true ), delay );
	}, [] );
	
	if ( !loading ) return null;
	
	if ( children ) return children as JSX.Element;
	
	return (
		<Box textAlign='center' py={2} {...containerProps}>
			<CircularProgress {...props}/>
		</Box>
	);
}
