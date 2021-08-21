import { Box, Button, ButtonGroup, ButtonProps, Typography, TypographyProps } from '@material-ui/core';
import React from 'react';

export type ActionButtonProps = { name: React.ReactNode } & ButtonProps;

export type ActionTitleProps = { actions?: ActionButtonProps[] } & TypographyProps;

export default function ActionTitle( { children, actions, ...props }: ActionTitleProps ) {
	return <Box display='flex' alignItems='center' p={1}>
		<Typography variant='h6' flexGrow={1} {...props}>{children}</Typography>
		<ButtonGroup>
			{actions?.map( ( { name, ...props }, index ) => <Button
				key={index}
				variant='contained'
				{...props}>
				{name}
			</Button> )}
		</ButtonGroup>
	</Box>;
}
