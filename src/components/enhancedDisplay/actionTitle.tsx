import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';
import Actions, { ActionProps } from '../actions';

export type ActionTitleProps = {
	containerProps?: BoxProps,
	actions?: ActionProps[] | ReactNode
} & TypographyProps;

export default function ActionTitle( { actions, containerProps, ...props }: ActionTitleProps ) {
	return (
		<Box display='flex' alignItems='center' p={1} {...containerProps}>
			<Typography variant='h3' flexGrow={1} {...props}/>
			{Array.isArray( actions ) ? <Actions items={actions}/> : actions}
		</Box>
	);
}
