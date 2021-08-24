import { Box, BoxProps, CircularProgress, CircularProgressProps } from '@material-ui/core';
import React from 'react';

export default function Loading( { delay = 250, children, containerProps, ...props }: {
	delay?: number,
	children?: React.ReactNode,
	containerProps?: BoxProps
} & CircularProgressProps ) {
	const [ loading, setLoading ] = React.useState( false );
	
	React.useEffect( () => {
		setTimeout( () => setLoading( true ), delay );
	}, [] );
	
	if ( !loading ) return null;
	
	if ( children ) return children as JSX.Element;
	
	return <Box textAlign='center' py={2} {...containerProps}>
		<CircularProgress {...props}/>
	</Box>;
}
