import type { BoxProps, TypographyProps } from '@mui/joy';
import { Box, Divider, Typography } from '@mui/joy';
import type { ReactNode } from 'react';
import type { ActionProps } from '../actions';
import Actions from '../actions';

export default function PageSection({
	title,
	titleProps,
	actions,
	children,
	max,
	...props
}: {
	title?: string;
	titleProps?: TypographyProps;
	actions?: ActionProps[] | ReactNode;
	max?: number;
} & BoxProps) {
	return (
		<Box {...props}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				px={{ xs: 1, sm: 0 }}>
				<Typography level='title-lg' py={1} {...titleProps}>
					{title}
				</Typography>
				{Array.isArray(actions) ? <Actions items={actions} max={max} /> : actions}
			</Box>
			<Divider sx={{ mb: 1 }} />
			{children}
		</Box>
	);
}
