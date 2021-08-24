import { Box, BoxProps, Button, ButtonGroup, ButtonProps, Typography, TypographyProps } from '@material-ui/core';
import React from 'react';

export type ActionButtonProps = { name: React.ReactNode } & ButtonProps;

export type ActionTitleProps = {
	containerProps?: BoxProps,
	actions?: ActionButtonProps[]
} & TypographyProps;

export default function ActionTitle( { children, actions, containerProps, ...props }: ActionTitleProps ) {
	return <Box display='flex' alignItems='center' p={1} {...containerProps}>
		<Typography variant='h6' flexGrow={1} {...props}>{children}</Typography>
		<ButtonGroup>
			{actions?.filter( Boolean ).map( ( { name, ...props }, index ) => <Button
				key={index}
				variant='contained'
				{...props}>
				{name}
			</Button> )}
		</ButtonGroup>
	</Box>;
}
