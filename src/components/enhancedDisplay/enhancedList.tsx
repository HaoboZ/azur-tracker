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
} from '@material-ui/core';
import {
	Add as AddIcon,
	Close as CloseIcon,
	Edit as EditIcon,
	ExpandMore as ExpandMoreIcon,
	Menu as MenuIcon
} from '@material-ui/icons';
import { isEqual, pick } from 'lodash';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ActionTitle, { ActionButtonProps } from '../actionTitle';
import Loading from '../loading';
import { _deleteRow, _selectRow, EnhancedDisplayProps, EnhancedListProps } from './helpers';

const EnhancedList = React.memo( function EnhancedList<Item extends { id?: string }>( {
	title,
	actionTitleProps,
	data = [],
	setData,
	editable,
	sortable,
	selectable,
	loading,
	loadingComponent = <Loading/>,
	emptyComponent = <Typography textAlign='center' py={2}>No Items</Typography>,
	renderRow,
	renderPanel,
	removeDelete,
	addButtonProps,
	editButtonProps,
	...props
}: EnhancedDisplayProps<Item> & EnhancedListProps<Item> ) {
	const theme = useTheme();
	
	const [ editing, setEditing ] = React.useState( false );
	
	const dataItems = React.useMemo( () => {
		const totalSelected = selectable?.selected.length;
		
		const row = ( item, index, selected ) => <>
			{sortable && editing && <ListItemIcon>
				<IconButton className='sortHandle'><MenuIcon/></IconButton>
			</ListItemIcon>}
			{renderRow( item, index, removeDelete
				? () => _deleteRow( data, setData, editable, selectable, item, index, selected, totalSelected )
				: undefined )}
			{Boolean( editable ) && !removeDelete && editing && ( editable?.min ? data.length > editable.min : true )
			&& <ListItemIcon sx={{ minWidth: 'unset' }}>
				<IconButton onClick={( e ) => {
					e.stopPropagation();
					_deleteRow( data, setData, editable, selectable, item, index, selected, totalSelected );
				}}>
					<CloseIcon/>
				</IconButton>
			</ListItemIcon>}
		</>;
		
		const panel = ( item, index ) => {
			const selected = selectable?.selected.includes( item?.id || index );
			return renderPanel
				? <Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon/>}
						classes={{
							root   : editing ? 'iconSpace' : undefined,
							content: 'center'
						}}>
						{row( item, index, selected )}
					</AccordionSummary>
					<AccordionDetails>
						{renderPanel( item, index )}
					</AccordionDetails>
				</Accordion>
				: selectable ? <ListItemButton
					divider
					selected={selected}
					onClick={selectable?.setSelected
					&& ( () => _selectRow( selectable, item, index, selected, totalSelected ) )}
					className={editing ? 'iconSpace' : undefined}>
					{row( item, index, selected )}
				</ListItemButton> : <ListItem divider className={editing ? 'iconSpace' : undefined}>
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
	}, [ data, Boolean( editable ), sortable, editing, selectable?.selected ] );
	
	return <List
		sx={{
			'& .center'   : { alignItems: 'center', my: 1 },
			'& .iconSpace': { pl: 0 },
			'& .slide'    : {
				'&-enter'       : { opacity: 0 },
				'&-enter-active': {
					opacity   : 1,
					transition: ( theme ) => theme.transitions.create( 'opacity' )
				},
				'&-exit'        : { opacity: 1 },
				'&-exit-active' : {
					opacity   : 0,
					transition: ( theme ) => theme.transitions.create( 'opacity' )
				}
			}
		}}
		subheader={Boolean( title || editable || sortable ) && <ActionTitle
			{...actionTitleProps}
			actions={!loading && ( editable || sortable ) ? [
				...sortable || !removeDelete ? [ {
					name     : editing ? 'Cancel' : 'Edit',
					onClick  : () => setEditing( !editing ),
					color    : editing ? 'error' : 'info',
					startIcon: editing ? <CloseIcon/> : <EditIcon/>,
					...editButtonProps
				} as ActionButtonProps ] : [],
				...( editable?.max ? data.length < editable.max : true ) ? [ {
					name     : 'Add',
					onClick  : async () => {
						editable.onAdd?.();
						setData?.( [ ...data, { ...await editable.newData() } ] );
					},
					color    : 'secondary',
					startIcon: <AddIcon/>,
					...addButtonProps
				} as ActionButtonProps ] : [] ] : undefined}>
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
