import { Box, Button, ButtonGroup, ButtonProps, Typography, TypographyProps } from '@material-ui/core';
import React from 'react';

export default function ActionTitle( { title = '', actions, ...props }: {
	title?: string,
	actions?: ( { name: string } & ButtonProps )[]
} & TypographyProps ) {
	return <Box display='flex' alignItems='center' p={1}>
		<Typography variant='h6' flexGrow={1} {...props}>{title}</Typography>
		<ButtonGroup>
			{actions?.map( ( { name, ...props }, index ) => <Button
				key={index}
				variant='contained'
				color='secondary'
				{...props}>
				{name}
			</Button> )}
		</ButtonGroup>
	</Box>;
}
