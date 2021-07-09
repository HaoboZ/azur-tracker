import { Button, ButtonGroup, ButtonProps, Toolbar, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import React from 'react';

export default function ActionTitle( { title = '', variant = 'h6', actions = [] }: {
	title?: string,
	variant?: Variant,
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
