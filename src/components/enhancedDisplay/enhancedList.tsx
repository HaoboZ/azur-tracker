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
	accordionSummaryClasses,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Paper,
	Typography
} from '@mui/material';
import { isEqual, pick } from 'lodash';
import { Fragment, memo, useMemo, useState } from 'react';
import Sortable from '../sortable';
import ActionTitle from './actionTitle';
import { _deleteRow, _selectRow, EnhancedDisplayProps, EnhancedListProps } from './helpers';

function EnhancedList<Item>( {
	title,
	actionTitleProps,
	items = [],
	extraData,
	setItems,
	editable,
	sortable,
	selectable,
	emptyComponent = <Typography textAlign='center' py={2}>No Items</Typography>,
	renderRow,
	renderPanel,
	removeEditing,
	addButtonProps,
	editButtonProps,
	...props
}: EnhancedDisplayProps<Item> & EnhancedListProps<Item> ) {
	const [ editing, setEditing ] = useState( false );
	
	const dataItems = useMemo( () => {
		const totalSelected = selectable?.selected.length;
		
		const row = ( item, index, handle, selected ) => (
			<Fragment>
				{!removeEditing && editing && sortable && (
					<ListItemIcon sx={{ pl: 1 }}>
						<MenuIcon {...handle}/>
					</ListItemIcon>
				)}
				{renderRow( item, index, removeEditing
					? () => _deleteRow( items, setItems, editable, selectable,
						item, index, selected, totalSelected )
					: undefined )}
				{!removeEditing && editing && Boolean( editable ) && ( editable?.min ? items.length > editable.min : true ) && (
					<ListItemIcon sx={{ minWidth: 'unset' }}>
						<IconButton onClick={( e ) => {
							e.stopPropagation();
							_deleteRow( items, setItems, editable, selectable,
								item, index, selected, totalSelected );
						}}>
							<CloseIcon/>
						</IconButton>
					</ListItemIcon>
				)}
			</Fragment>
		);
		
		const panel = ( { item, index, handle }: { item, index, handle? } ) => {
			const selected = selectable?.selected.includes( item?.id ?? index );
			return renderPanel ? (
				<Accordion>
					<AccordionSummary className='listItem' expandIcon={<ExpandMoreIcon/>}>
						{row( item, index, handle, selected )}
					</AccordionSummary>
					<AccordionDetails>
						{renderPanel( item, index )}
					</AccordionDetails>
				</Accordion>
			) : selectable?.setSelected ? (
				<ListItemButton
					divider
					component={Paper}
					className='listItem'
					selected={selected}
					onClick={() => _selectRow( selectable,
						item, index, selected, totalSelected )}>
					{row( item, index, handle, selected )}
				</ListItemButton>
			) : (
				<ListItem
					divider
					component={Paper}
					className='listItem'
					selected={selected}>
					{row( item, index, handle, selected )}
				</ListItem>
			);
		};
		
		return sortable ? (
			<Sortable
				items={items}
				setItems={setItems}
				renderItem={panel}
			/>
		) : items.map( ( item, index ) => (
			<Fragment key={index}>
				{panel( { item, index } )}
			</Fragment>
		) );
	}, [ items, extraData, Boolean( editable ), sortable, editing, removeEditing, selectable?.selected ] );
	
	return (
		<List
			sx={{
				'.listItem'                              : {
					...removeEditing || editing ? { px: 1 } : undefined,
					':not(:first-of-type)': { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
					':not(:last-of-type)' : { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
				},
				[ `.${accordionSummaryClasses.content}` ]: { alignItems: 'center' },
				'overflow'                               : 'hidden'
			}}
			subheader={Boolean( title || editable || sortable ) && (
				<ActionTitle
					actions={!removeEditing && ( editable || sortable ) ? [
						sortable && {
							name       : editing ? 'Cancel' : 'Edit',
							onClick    : () => setEditing( !editing ),
							buttonProps: {
								color    : editing ? 'error' : 'info',
								startIcon: editing ? <CloseIcon/> : <EditIcon/>,
								...editButtonProps
							}
						},
						( editable?.max ? items.length < editable.max : true ) && {
							name       : 'Add',
							onClick    : async () => {
								editable.onAdd?.();
								setItems?.( [ ...items, { ...await editable.newData() } ] );
							},
							buttonProps: {
								color    : 'secondary',
								startIcon: <AddIcon/>,
								...addButtonProps
							}
						}
					] : undefined}
					{...actionTitleProps}>
					{title}
				</ActionTitle>
			)}
			{...props}>
			{!items.length
				? <Paper>{emptyComponent}</Paper>
				: dataItems}
		</List>
	);
}

export default memo( EnhancedList, ( prevProps, nextProps ) =>
	isEqual( pick( prevProps, [ 'title', 'loading' ] ), pick( nextProps, [ 'title', 'loading' ] ) )
	&& Object.is( prevProps.items, nextProps.items )
	&& Object.is( prevProps.extraData, nextProps.extraData ) ) as typeof EnhancedList;
