import { Container, ContainerProps, Theme, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';
import ScrollTop from '../scrollTop';

export default function PageContainer( { children, sx, ...props }: {
	children?: ReactNode
} & ContainerProps ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	
	return <Container
		disableGutters={!wide}
		sx={{ overflowX: 'hidden', ...sx }}
		{...props}>
		<ScrollTop/>
		{children}
	</Container>;
}
