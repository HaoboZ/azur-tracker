import { Container, ContainerProps, Theme, useMediaQuery } from '@mui/material';
import React from 'react';

import ScrollTop from '../scrollTop';

export default function PageContainer( { children, sx, ...props }: {
	children?: React.ReactNode
} & ContainerProps ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	
	return <Container
		disableGutters={!wide}
		sx={{ overflowX: 'hidden', minHeight: 'inherit', ...sx }}
		{...props}>
		<ScrollTop/>
		{children}
	</Container>;
}