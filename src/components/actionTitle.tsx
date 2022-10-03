import type { BoxProps, TypographyProps } from '@mui/material';
import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import type { ActionProps } from './actions';
import Actions from './actions';

export type ActionTitleProps = {
	containerProps?: BoxProps,
	actions?: ActionProps[] | ReactNode
} & TypographyProps;

export default function ActionTitle( { actions, containerProps, ...props }: ActionTitleProps ) {
	return (
		<Box display='flex' alignItems='center' justifyContent='space-between' p={1} {...containerProps}>
			<Typography variant='h3' {...props}/>
			{Array.isArray( actions ) ? <Actions items={actions}/> : actions}
		</Box>
	);
}
