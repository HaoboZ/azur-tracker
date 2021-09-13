import {
	Add as AddIcon,
	Close as CloseIcon,
	Edit as EditIcon,
	ExpandMore as ExpandMoreIcon,
	Menu as MenuIcon
} from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Paper,
	Typography
} from '@mui/material';
import { isEqual, pick } from 'lodash';
import React from 'react';

import ActionTitle from '../actionTitle';
import Loading from '../loading';
import Sortable from '../sortable';
import { _deleteRow, _selectRow, EnhancedDisplayProps, EnhancedListProps } from './helpers';

const EnhancedList = React.memo( function EnhancedList<Item>( {
	title,
	actionTitleProps,
	data = [],
	extraData,
	setData,
	editable,
	sortable,
	selectable,
	loading,
	loadingComponent = <Loading/>,
	emptyComponent = <Typography textAlign='center' py={2}>No Items</Typography>,
	renderRow,
	renderPanel,
	removeEditing,
	addButtonProps,
	editButtonProps,
	...props
}: EnhancedDisplayProps<Item> & EnhancedListProps<Item> ) {
	const [ editing, setEditing ] = React.useState( false );
	
	const dataItems = React.useMemo( () => {
		const totalSelected = selectable?.selected.length;
		
		const row = ( item, index, handle, selected ) => <>
			{!removeEditing && editing && sortable && <ListItemIcon sx={{ pl: 1 }}>
				<MenuIcon {...handle}/>
			</ListItemIcon>}
			{renderRow( item, index, removeEditing
				? () => _deleteRow( data, setData, editable, selectable,
					item, index, selected, totalSelected )
				: undefined )}
			{!removeEditing && editing && Boolean( editable ) && ( editable?.min ? data.length > editable.min : true )
			&& <ListItemIcon sx={{ minWidth: 'unset' }}>
				<IconButton onClick={( e ) => {
					e.stopPropagation();
					_deleteRow( data, setData, editable, selectable,
						item, index, selected, totalSelected );
				}}>
					<CloseIcon/>
				</IconButton>
			</ListItemIcon>}
		</>;
		
		const panel = ( { item, index, ref, style, handle }: { item, index, ref?, style?, handle? } ) => {
			const selected = selectable?.selected.includes( item?.id ?? index );
			return renderPanel
				? <Accordion ref={ref} style={style}>
					<AccordionSummary expandIcon={<ExpandMoreIcon/>}>
						{row( item, index, handle, selected )}
					</AccordionSummary>
					<AccordionDetails>
						{renderPanel( item, index )}
					</AccordionDetails>
				</Accordion>
				: selectable?.setSelected
					? <ListItemButton
						component={Paper}
						ref={ref}
						style={style}
						divider
						selected={selected}
						onClick={() => _selectRow( selectable,
							item, index, selected, totalSelected )}>
						{row( item, index, handle, selected )}
					</ListItemButton>
					: <ListItem
						component={Paper}
						ref={ref}
						style={style}
						divider
						selected={selected}>
						{row( item, index, handle, selected )}
					</ListItem>;
		};
		
		return sortable
			? <Sortable
				items={data as any}
				setItems={setData as any}
				renderItem={( props ) => panel( props )}
			/>
			: data.map( ( item, index ) => <React.Fragment key={index}>
				{panel( { item, index } )}
			</React.Fragment> );
	}, [ data, extraData, Boolean( editable ), sortable, editing, removeEditing, selectable?.selected ] );
	
	return <List
		sx={{
			'& .MuiAccordionSummary-content'                    : { alignItems: 'center' },
			[ '& .MuiAccordionSummary-root,' +
			' & .MuiListItem-root,' +
			' & .MuiListItemButton-root' ]                      : removeEditing || editing ? { px: 1 } : undefined,
			[ '& .MuiListItem-root ~ .MuiListItem-root,' +
			' & .MuiListItemButton-root ~ .MuiListButton-root' ]: {
				borderTopLeftRadius : 0,
				borderTopRightRadius: 0
			},
			'& .MuiListItem-root:not(:last-of-type)'            : {
				borderBottomLeftRadius : 0,
				borderBottomRightRadius: 0
			},
			overflow                                            : 'hidden'
		}}
		subheader={Boolean( title || editable || sortable ) && <ActionTitle
			actions={!removeEditing && !loading && ( editable || sortable ) ? [
				sortable && {
					name     : editing ? 'Cancel' : 'Edit',
					onClick  : () => setEditing( !editing ),
					color    : editing ? 'error' : 'info',
					startIcon: editing ? <CloseIcon/> : <EditIcon/>,
					...editButtonProps
				},
				( editable?.max ? data.length < editable.max : true ) && {
					name     : 'Add',
					onClick  : async () => {
						editable.onAdd?.();
						setData?.( [ ...data, { ...await editable.newData() } ] );
					},
					color    : 'secondary',
					startIcon: <AddIcon/>,
					...addButtonProps
				} ] : undefined}
			{...actionTitleProps}>
			{title}
		</ActionTitle>}
		{...props}>
		{loading || !data.length
			? <Paper>{loading ? loadingComponent : emptyComponent}</Paper>
			: dataItems}
	</List>;
}, ( prevProps, nextProps ) =>
	isEqual( pick( prevProps, [ 'title', 'loading' ] ), pick( nextProps, [ 'title', 'loading' ] ) )
	&& Object.is( prevProps.data, nextProps.data )
	&& Object.is( prevProps.extraData, nextProps.extraData ) );
export default EnhancedList;
