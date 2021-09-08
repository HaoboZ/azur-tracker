import {
	Box,
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

export default function PageSection( { actions, listItemProps, children, ...props }: {
	actions?: ActionButtonProps[] | React.ReactChild,
	listItemProps?: ListItemProps,
	children?: React.ReactNode
} & ListItemTextProps ) {
	return <Box display='flex' flexDirection='column'>
		<ListItem ContainerComponent='div' sx={{ my: 2 }} divider {...listItemProps}>
			<ListItemText primaryTypographyProps={{ variant: 'h2' }} {...props}/>
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
		</ListItem>
		{children}
	</Box>;
}
