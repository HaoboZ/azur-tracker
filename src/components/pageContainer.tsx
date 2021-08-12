import { Box, ButtonProps, Container, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

import usePageHeight from '../lib/hooks/usePageHeight';
import ActionTitle from './actionTitle';
import ScrollTop from './scrollTop';

export default function PageContainer( { title, actions, children }: {
	title?: string,
	actions?: ( { name: string } & ButtonProps )[],
	children?: React.ReactNode
} ) {
	const height = usePageHeight();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	return <Box sx={{
		minHeight: {
			xs: `min(calc(100vh - 56px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height - 56}px)`,
			sm: `min(calc(100vh - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height - 64}px)`
		}
	}}>
		<ScrollTop/>
		<Container
			fixed
			disableGutters={!wide}
			sx={{ overflowX: 'hidden', minHeight: 'inherit' }}>
			<ActionTitle title={title} actions={actions}/>
			{children}
		</Container>
	</Box>;
}
