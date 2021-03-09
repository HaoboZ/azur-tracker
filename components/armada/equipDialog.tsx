import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid,
	Paper,
	Switch,
	Typography,
	Zoom
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { Alert } from '@material-ui/lab';
import Image from 'next/image';
import React from 'react';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';

import { rarityColors } from '../../lib/reference/colors';
import { equippable, equips, equipsIndex } from '../../lib/reference/equipRef';
import shipRef from '../../lib/reference/shipRef';
import { ship_setShip } from '../../lib/store/shipReducer';
import EquipFilter from './equipFilter';

const Transition = React.forwardRef( (
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) => <Zoom ref={ ref } { ...props }/> );

export default function EquipDialog( { colors, open, onClose, info, selectedEquip }: {
	colors: Record<string, string>
	open: boolean
	onClose: () => void
	info: { rowData: typeof shipRef[string], index: number }
	selectedEquip: typeof equips[number]
} ) {
	const dispatch = useDispatch();
	
	const [ equipList, equipListIndex ] = React.useMemo( () => {
		const equipType = equippable[ info?.rowData.equip[ info.index ] ];
		const equipList = equipType ? equips
			.filter( ( item ) => equipType.includes( item.type ) ) : [];
		equipList.unshift( equips[ 0 ] );
		return [ equipList, equipList.reduce( ( res, item ) => {
			res[ item.id ] = item;
			return res;
		}, {} as typeof equipsIndex ) ];
	}, [ info ] );
	
	const currentEquip = equipsIndex[ info?.rowData.equipped[ info.index ][ 0 ] || 0 ];
	
	const [ equip, setEquip ] = React.useState<typeof equips[number]>( equips[ 0 ] );
	React.useEffect( () => {
		if ( equipListIndex[ selectedEquip?.id ] )
			setEquip( selectedEquip );
		else if ( currentEquip?.id )
			setEquip( currentEquip );
		else
			setEquip( equips[ 0 ] );
	}, [ info, selectedEquip ] );
	
	const [ override, setOverride ] = React.useState( false );
	React.useEffect( () => {
		setOverride( info?.rowData.equipped[ info.index ]?.[ 1 ] || false );
	}, [ info ] );
	
	if ( !( equip.id in equipListIndex ) ) return null;
	
	function confirmEquip() {
		info.rowData.equipped[ info.index ] = [ equip.id, override ];
		dispatch( ship_setShip( info.rowData.id, { equip: info.rowData.equipped } ) );
	}
	
	return <Dialog
		open={ open }
		TransitionComponent={ Transition }
		PaperComponent={ ( props ) => <Draggable handle='.MuiDialogTitle-root'>
			<Paper { ...props }/>
		</Draggable> }
		keepMounted
		maxWidth='xs'
		fullWidth
		onClose={ onClose }
		onKeyPress={ ( e ) => {
			if ( e.key === 'Enter' )
				confirmEquip();
		} }>
		<DialogTitle>Switch Equipment?</DialogTitle>
		<DialogContent>
			<Grid container>
				{ info?.rowData.special[ info.index ] ?
					<Grid item xs={ 12 } component={ Box } pb={ 2 }>
						<Alert severity='warning' variant='filled'>
							Special Equip Slot (Check Skills & Equipment)
						</Alert>
					</Grid> : undefined }
				<Grid item xs={ 5 } component={ Box } textAlign='center'>
					<Image
						src={ `/images/equips/${ currentEquip.image }` }
						alt={ currentEquip.name }
						height={ 128 }
						width={ 128 }
						className={ colors[ rarityColors[ currentEquip.rarity ] ] }/>
				</Grid>
				<Grid item xs={ 2 }>
					<Box alignItems='center' height='100%' display='flex' justifyContent='center'>
						<Typography variant='h2'>⇒</Typography>
					</Box>
				</Grid>
				<Grid item xs={ 5 } component={ Box } textAlign='center'>
					<Image
						src={ `/images/equips/${ equip.image }` }
						alt={ equip.name }
						height={ 128 }
						width={ 128 }
						className={ colors[ rarityColors[ equip.rarity ] ] }/>
				</Grid>
				<Grid item xs={ 5 }>
					<Typography align='center'>{ currentEquip.name }</Typography>
				</Grid>
				<Grid item xs={ 2 }/>
				<Grid item xs={ 5 }>
					<Typography align='center'>{ equip.name }</Typography>
				</Grid>
				<Grid item xs={ 12 }>
					<EquipFilter
						colors={ colors }
						equipList={ equipList }
						value={ equip }
						setValue={ setEquip }/>
				</Grid>
			</Grid>
		</DialogContent>
		<DialogActions>
			<FormControlLabel
				control={ <Switch
					color='primary'
					checked={ override }
					onChange={ ( e ) =>
						setOverride( e.target.checked ) }/> }
				label='Force BiS'
				labelPlacement='start'/>
			<Button variant='contained' color='secondary' onClick={ onClose }>
				Cancel
			</Button>
			<Button variant='contained' color='primary' onClick={ () => {
				confirmEquip();
				onClose();
			} }>
				Confirm
			</Button>
		</DialogActions>
	</Dialog>;
}
