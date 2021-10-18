import { Box, ListItem, ListItemProps, ListItemText, ListItemTextProps } from '@mui/material';
import React from 'react';
import Actions, { ActionProps } from '../actions';

export default function PageSection( { actions, listItemProps, children, max, ...props }: {
	actions?: ActionProps[] | React.ReactChild,
	max?: number,
	listItemProps?: ListItemProps,
	children?: React.ReactNode
} & ListItemTextProps ) {
	return <Box display='flex' flexDirection='column'>
		<ListItem component='div' sx={{ my: 2 }} divider {...listItemProps as any}>
			<ListItemText primaryTypographyProps={{ variant: 'h3' }} {...props}/>
			{Array.isArray( actions ) ? <Actions items={actions} max={max}/> : actions}
		</ListItem>
		{children}
	</Box>;
}
