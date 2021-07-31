import { Button, ButtonGroup, ButtonProps, Toolbar, Typography, TypographyVariant } from '@material-ui/core';
import React from 'react';

export default function ActionTitle( { title = '', variant = 'h6', actions = [] }: {
	title?: string,
	variant?: TypographyVariant,
	actions?: {
		name: string,
		onClick?: () => void,
		props?: ButtonProps
	}[]
} ) {
	return <Toolbar>
		<Typography variant={variant} flexGrow={1}>{title}</Typography>
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
	</Toolbar>;
}
