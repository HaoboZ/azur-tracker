import { Box, Button, ButtonGroup, Typography } from '@material-ui/core';
import React from 'react';

export default function PageTitle( { title, actions = [] }: {
	title: string
	actions?: { name: string, onClick?: () => void, props?: React.ComponentProps<typeof Button> }[]
} ) {
	return <Box display='flex' justifyContent='space-between' p={2}>
		<Typography variant='h5'>{title}</Typography>
		<ButtonGroup>
			{actions.map( ( { name, onClick, props }, index ) => <Button
				key={index}
				variant='contained'
				color='secondary'
				{...props}
				onClick={onClick}>
				{name}
			</Button> )}
		</ButtonGroup>
	</Box>;
}
