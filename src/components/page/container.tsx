'use client';
import type { ContainerProps } from '@mui/material';
import { Container, NoSsr } from '@mui/material';
import ScrollTop from '../scrollTop';

export default function PageContainer({
	noSsr,
	children,
	sx,
	...props
}: { noSsr?: boolean } & ContainerProps) {
	if (noSsr)
		return (
			<NoSsr>
				<Container sx={{ px: 0, ...sx }} {...props}>
					<ScrollTop />
					{children}
				</Container>
			</NoSsr>
		);

	return (
		<Container sx={{ px: 0, ...sx }} {...props}>
			<ScrollTop />
			{children}
		</Container>
	);
}
