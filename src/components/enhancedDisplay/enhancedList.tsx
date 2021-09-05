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
	Typography,
	useTheme
} from '@mui/material';
import { isEqual, pick } from 'lodash';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ActionTitle from '../actionTitle';
import Loading from '../loading';
import { _deleteRow, _selectRow, EnhancedDisplayProps, EnhancedListProps } from './helpers';

const EnhancedList = React.memo( function EnhancedList<Item extends { id?: string }>( {
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
	const theme = useTheme();
	
	const [ editing, setEditing ] = React.useState( false );
	
	const dataItems = React.useMemo( () => {
		const totalSelected = selectable?.selected.length;
		
		const row = ( item, index, selected ) => <>
			{!removeEditing && editing && sortable && <ListItemIcon>
				<IconButton className='sortHandle'><MenuIcon/></IconButton>
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
		
		const panel = ( item, index ) => {
			const selected = selectable?.selected.includes( item?.id || index );
			return renderPanel
				? <Accordion>
					<AccordionSummary expandIcon={<ExpandMoreIcon/>}>
						{row( item, index, selected )}
					</AccordionSummary>
					<AccordionDetails>
						{renderPanel( item, index )}
					</AccordionDetails>
				</Accordion>
				: selectable?.setSelected
					? <ListItemButton
						divider
						selected={selected}
						onClick={() => _selectRow( selectable,
							item, index, selected, totalSelected )}>
						{row( item, index, selected )}
					</ListItemButton>
					: <ListItem divider selected={selected}>
						{row( item, index, selected )}
					</ListItem>;
		};
		
		const transition = <TransitionGroup component={null}>
			{data.map( ( item, index ) => <CSSTransition
				key={item.id || index}
				timeout={theme.transitions.duration.standard}
				classNames='slide'>
				{panel( item, index )}
			</CSSTransition> )}
		</TransitionGroup>;
		
		const sort = sortable
			? <ReactSortable
				list={data as any}
				setList={setData as any}
				handle='.sortHandle'
				ghostClass='selectedSort'
				forceFallback
				animation={theme.transitions.duration.shorter}>
				{transition}
			</ReactSortable>
			: transition;
		
		return renderPanel ? sort : <Paper>{sort}</Paper>;
	}, [ data, extraData, Boolean( editable ), sortable, editing, removeEditing, selectable?.selected ] );
	
	return <List
		sx={{
			'& .MuiAccordionSummary-content': { alignItems: 'center' },
			[ '& .MuiAccordionSummary-root,' +
			' & .MuiListItem-root,' +
			' & .MuiListItemButton-root' ]  :
				removeEditing || editing ? { px: 1 } : undefined,
			'& .slide'                      : {
				'&-enter'       : { opacity: 0 },
				'&-enter-active': {
					opacity   : 1,
					transition: ( { transitions } ) => transitions.create( 'opacity' )
				},
				'&-exit'        : { opacity: 1 },
				'&-exit-active' : {
					opacity   : 0,
					transition: ( { transitions } ) => transitions.create( 'opacity' )
				}
			}
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
