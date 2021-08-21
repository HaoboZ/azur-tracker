import { Box, BoxProps, CircularProgress, CircularProgressProps } from '@material-ui/core';
import React from 'react';

export default function Loading( { delay = 250, containerProps, ...props }: {
	delay?: number,
	containerProps?: BoxProps
} & CircularProgressProps ) {
	const [ loading, setLoading ] = React.useState( false );
	
	React.useEffect( () => {
		setTimeout( () => setLoading( true ), delay );
	}, [] );
	
	return loading && <Box sx={{ textAlign: 'center', py: 2 }} {...containerProps}>
		<CircularProgress {...props}/>
	</Box>;
}
