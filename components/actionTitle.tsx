import { Button, ButtonGroup, ButtonProps, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import React from 'react';

const useStyles = makeStyles( {
	fullTitle: {
		flexGrow: 1
	}
} );

export default function ActionTitle( { title = '', variant = 'h6', actions = [] }: {
	title?: string,
	variant?: Variant,
	actions?: {
		name: string,
		onClick?: () => void,
		props?: ButtonProps
	}[]
} ) {
	const classes = useStyles();
	
	return <Toolbar>
		<Typography variant={variant} className={classes.fullTitle}>{title}</Typography>
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
