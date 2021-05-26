import { Box, Button, ButtonGroup, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import React from 'react';

export default function ActionTitle( { title = '', variant = 'h6', actions = [] }: {
	title?: string,
	variant?: Variant,
	actions?: {
		name: string,
		onClick?: () => void,
		props?: React.ComponentProps<typeof Button>
	}[]
} ) {
	return <Box display='flex' justifyContent='space-between' p={2}>
		<Typography variant={variant}>{title}</Typography>
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
