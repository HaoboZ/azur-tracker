import {
	Button,
	ButtonGroup,
	ListItem,
	ListItemProps,
	ListItemSecondaryAction,
	ListItemText,
	ListItemTextProps
} from '@mui/material';
import React from 'react';

import { ActionButtonProps } from '../actionTitle';

export default function PageTitle( { actions, listItemProps, children, ...props }: {
	actions?: ActionButtonProps[] | React.ReactChild,
	listItemProps?: ListItemProps,
	children?: React.ReactNode
} & ListItemTextProps ) {
	return <ListItem component='div' {...listItemProps as any}>
		<ListItemText
			primaryTypographyProps={{ variant: 'h1' }}
			primary={children}
			secondaryTypographyProps={{ variant: 'subtitle1' }}
			{...props}
		/>
		{Array.isArray( actions ) ? <ListItemSecondaryAction>
			<ButtonGroup>
				{actions.filter( Boolean ).map( ( { name, ...props }, index ) => <Button
					key={index}
					variant='contained'
					{...props}>
					{name}
				</Button> )}
			</ButtonGroup>
		</ListItemSecondaryAction> : actions}
	</ListItem>;
}
