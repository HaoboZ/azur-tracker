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
		
		const row = ( handle, item, index, selected ) => <>
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
		
		const panel = ( { ref, style, handle, item, index }: { ref?, style?, handle?, item, index } ) => {
			const selected = selectable?.selected.includes( item?.id || index );
			return renderPanel
				? <Accordion ref={ref} style={style}>
					<AccordionSummary expandIcon={<ExpandMoreIcon/>}>
						{row( handle, item, index, selected )}
					</AccordionSummary>
					<AccordionDetails>
						{renderPanel( item, index )}
					</AccordionDetails>
				</Accordion>
				: <Paper ref={ref} style={style}>
					{selectable?.setSelected
						? <ListItemButton
							divider
							selected={selected}
							onClick={() => _selectRow( selectable,
								item, index, selected, totalSelected )}>
							{row( handle, item, index, selected )}
						</ListItemButton>
						: <ListItem divider selected={selected}>
							{row( handle, item, index, selected )}
						</ListItem>}
				</Paper>;
		};
		
		return sortable
			? <Sortable
				items={data as any}
				setItems={setData as any}
				renderItem={( props ) => panel( props )}
			/>
			: data.map( ( item, index ) => panel( { item, index } ) );
		// return renderPanel ? sort : <Paper>{sort}</Paper>;
	}, [ data, extraData, Boolean( editable ), sortable, editing, removeEditing, selectable?.selected ] );
	
	return <List
		sx={{
			'& .MuiAccordionSummary-content': { alignItems: 'center' },
			[ '& .MuiAccordionSummary-root,' +
			' & .MuiListItem-root,' +
			' & .MuiListItemButton-root' ]  :
				removeEditing || editing ? { px: 1 } : undefined,
			overflow                        : 'hidden'
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
