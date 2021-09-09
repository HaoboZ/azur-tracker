import { Box, BoxProps, Button, ButtonGroup, ButtonProps, Typography, TypographyProps } from '@mui/material';
import React from 'react';

export type ActionButtonProps = { name: React.ReactNode } & ButtonProps;

export type ActionTitleProps = {
	containerProps?: BoxProps,
	actions?: ActionButtonProps[] | React.ReactChild
} & TypographyProps;

export default function ActionTitle( { children, actions, containerProps, ...props }: ActionTitleProps ) {
	return <Box display='flex' alignItems='center' p={1} {...containerProps}>
		<Typography variant='h3' flexGrow={1} {...props}>{children}</Typography>
		{Array.isArray( actions ) ? <ButtonGroup>
			{actions.filter( Boolean ).map( ( { name, ...props }, index ) => <Button
				key={index}
				variant='contained'
				{...props}>
				{name}
			</Button> )}
		</ButtonGroup> : actions}
	</Box>;
}
