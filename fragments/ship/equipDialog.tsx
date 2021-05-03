import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid,
	Link, makeStyles,
	Switch,
	Typography,
	Zoom
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { Alert } from '@material-ui/lab';
import _ from 'lodash';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import SVGIcon from '../../lib/icons';

import { mappedColorClasses, rarityColors } from '../../lib/reference/colors';
import { equippable, equips, equipsIndex, equipTier } from '../../lib/reference/equipRef';
import shipRef from '../../lib/reference/shipRef';
import { ship_setShip } from '../../lib/store/reducers/shipReducer';
import EquipFilter from './equipFilter';
import EquipSelector from './equipSelector';

const Transition = React.forwardRef( (
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) => <Zoom ref={ref} {...props}/> );

const useStyles = makeStyles( () => mappedColorClasses as any );

export default function EquipDialog( { open, onClose, info, selectedEquip }: {
	open: boolean
	onClose: () => void
	info: { rowData: typeof shipRef[string], index: number }
	selectedEquip: typeof equips[number]
} ) {
	const dispatch = useDispatch();
	const classes = useStyles();
	
	// list of equips that can go in slot, dictionary of equips list, list of equips by tier
	const [ equipList, equipListIndex, tierList ] = React.useMemo( () => {
		const equipType = equippable[ info?.rowData.equip[ info.index ] ];
		const equipList = equipType ? equips
			.filter( ( item ) => equipType.includes( item.type ) ) : [];
		equipList.unshift( equips[ 0 ] );
		
		const tierList = equipType ? equipTier[ info?.rowData.equip[ info.index ] ] : [];
		
		return [
			equipList,
			equipList.reduce( ( res, item ) => {
				res[ item.id ] = item;
				return res;
			}, {} as typeof equipsIndex ),
			_.reduce( tierList, ( arr, val, key ) => {
				arr[ val[ 1 ] ] = {
					...equipsIndex[ key ],
					tier: [
						      <SVGIcon name='8star' color='gold'/>,
						      <SVGIcon name='star' color='gold'/>,
						      <SVGIcon name='star' color='silver'/>,
						      <SVGIcon name='star' color='chocolate'/>,
						      <SVGIcon name='star' color='black'/>
					      ][ val[ 0 ] ]
				};
				return arr;
			}, [] as ( typeof equips[number] & { tier?: number } )[] )
		];
	}, [ info ] );
	
	// equipment currently in that slot
	const currentEquip = equipsIndex[ info?.rowData.equipped[ info.index ][ 0 ] ] || equips[ 0 ];
	
	// equipment that will go in slot
	const [ equip, setEquip ] = React.useState<typeof equips[number]>( equips[ 0 ] );
	React.useEffect( () => {
		if ( selectedEquip?.id && equipListIndex[ selectedEquip.id ] )
			setEquip( selectedEquip );
		else if ( currentEquip?.id )
			setEquip( currentEquip );
		else
			setEquip( equips[ 0 ] );
	}, [ info, selectedEquip ] );
	
	const [ override, setOverride ] = React.useState<0 | 1>( 0 );
	React.useEffect( () => {
		setOverride( info?.rowData.equipped[ info.index ]?.[ 1 ] || 0 );
	}, [ info ] );
	
	const [ anchorEl, setAnchorEl ] = React.useState<HTMLElement>( null );
	
	if ( !( equip.id in equipListIndex ) ) return null;
	
	function confirmEquip() {
		info.rowData.equipped[ info.index ] = [ equip.id, override, 6 ];
		dispatch( ship_setShip( info.rowData.id, { equip: info.rowData.equipped } ) );
	}
	
	function close() {
		setAnchorEl( null );
		onClose();
	}
	
	return <Dialog
		open={open}
		onClose={close}
		TransitionComponent={Transition}
		keepMounted
		maxWidth='xs'
		fullWidth
		onKeyPress={( e ) => {
			if ( e.key === 'Enter' ) {
				e.preventDefault();
				confirmEquip();
				close();
			}
		}}>
		<DialogTitle>Switch Equipment?</DialogTitle>
		<DialogContent>
			<Grid container alignItems='center' justify='center'>
				{info?.rowData.special[ info.index ] ?
					<Grid item xs={12} component={Box} pb={2}>
						<Alert severity='warning' variant='filled'>
							Special Equip Slot (Check Skills & Equipment)
						</Alert>
					</Grid> : undefined}
				<Grid item xs={5} component={Box} textAlign='center'>
					<Link target='_blank' href={`https://azurlane.koumakan.jp/${
						unescape( currentEquip.image.replace( '$', '%' ) )}`}>
						<Image
							src={`/images/equips/${currentEquip.image}.png`}
							alt={currentEquip.name}
							height={128}
							width={128}
							className={classes[ rarityColors[ currentEquip.rarity ] ]}
						/>
					</Link>
				</Grid>
				<Grid item xs={2}>
					<Typography variant='h2' align='center'>⇒</Typography>
				</Grid>
				<Grid item xs={5} component={Box} textAlign='center'>
					<Link target='_blank' href={`https://azurlane.koumakan.jp/${
						unescape( equip.image.replace( '$', '%' ) )}`}>
						<Image
							src={`/images/equips/${equip.image}.png`}
							alt={equip.name}
							height={128}
							width={128}
							className={classes[ rarityColors[ equip.rarity ] ]}
						/>
					</Link>
				</Grid>
				<Grid item xs={5}>
					<Typography align='center'>{currentEquip.name}</Typography>
				</Grid>
				<Grid item xs={2}/>
				<Grid item xs={5}>
					<Typography align='center'>{equip.name}</Typography>
				</Grid>
				<Grid item xs={5} component={Box} textAlign='center'>
					<Button
						variant='outlined'
						onClick={( e ) => setAnchorEl( e.currentTarget )}>
						Equipment Tier
					</Button>
					<EquipSelector
						anchorEl={anchorEl}
						closeAnchor={() => setAnchorEl( null )}
						colors={classes}
						equipList={tierList}
						setEquip={( id ) => setEquip( equipListIndex[ id ] )}
					/>
				</Grid>
				<Grid item xs={1}/>
				<Grid item xs={6}>
					<EquipFilter
						colors={classes}
						equipList={equipList}
						value={equip}
						setValue={setEquip}
					/>
				</Grid>
			</Grid>
		</DialogContent>
		<DialogActions>
			<FormControlLabel
				control={<Switch
					color='primary'
					checked={!!override}
					onChange={( e ) => setOverride( +e.target.checked as any )}
				/>}
				label='Force BiS'
				labelPlacement='start'/>
			<Button variant='contained' color='secondary' onClick={close}>
				Cancel
			</Button>
			<Button variant='contained' color='primary' onClick={() => {
				confirmEquip();
				close();
			}}>
				Confirm
			</Button>
		</DialogActions>
	</Dialog>;
}
