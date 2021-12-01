import { Theme, useMediaQuery } from '@mui/material';
import BottomBar from './bottomBar';
import TitleBar from './titleBar';

export default function Navigation( { children } ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	
	if ( wide ) {
		return <TitleBar>{children}</TitleBar>;
	} else {
		return <BottomBar>{children}</BottomBar>;
	}
}
