import { Container, ContainerProps } from '@mui/material';
import { ReactNode } from 'react';
import { useWideMedia } from '../../hooks/useWideMedia';
import ScrollTop from '../scrollTop';

export default function PageContainer( { children, sx, ...props }: {
	children?: ReactNode
} & ContainerProps ) {
	return (
		<Container
			disableGutters={!useWideMedia()}
			sx={{ overflowX: 'hidden', ...sx }}
			{...props}>
			<ScrollTop/>
			{children}
		</Container>
	);
}
