import type { ContainerProps } from '@mui/material';
import { Container } from '@mui/material';
import ScrollTop from '../scrollTop';

export default function PageContainer({ children, sx, ...props }: ContainerProps) {
	return (
		<Container sx={{ px: 0, ...sx }} {...props}>
			<ScrollTop />
			{children}
		</Container>
	);
}
