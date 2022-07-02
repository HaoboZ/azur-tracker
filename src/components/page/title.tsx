import { ListItem, ListItemProps, ListItemText, ListItemTextProps } from '@mui/material';
import { ReactNode } from 'react';
import Actions, { ActionProps } from '../actions';

export default function PageTitle( { actions, listItemProps, children, max, ...props }: {
	actions?: ActionProps[] | ReactNode,
	max?: number,
	listItemProps?: ListItemProps<'div'>
} & ListItemTextProps ) {
	return (
		<ListItem component='div' {...listItemProps}>
			<ListItemText
				primaryTypographyProps={{ variant: 'h1' }}
				primary={children}
				secondaryTypographyProps={{ variant: 'subtitle1' }}
				{...props}
			/>
			{Array.isArray( actions ) ? <Actions items={actions} max={max}/> : actions}
		</ListItem>
	);
}
