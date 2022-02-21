import {
	Alert,
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid,
	Link,
	Switch,
	Typography
} from '@mui/material';
import { cloneDeep, reduce } from 'lodash-es';
import Image from 'next/image';
import { Fragment, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import useEventListener from '../../../../hooks/useEventListener';
import { useModalControls } from '../../../../providers/modal';
import { fleet_setShip } from '../../../../store/reducers/fleetReducer';
import { rarityColors } from '../../../colors';
import fleetData, { Ship } from '../../data';
import getTier from '../../getTier';
import { TierIcon } from '../../tierIcon';
import equipData, { Equip, equippable, equipsIndex, equipTier } from './data';
import EquipFilter from './filter';
import EquipTierSelector from './tierSelector';

export default function EquipModal( { info, selectedEquip }: {
	info: { ship: Ship, index: number },
	selectedEquip?: Equip
} ) {
	const { closeModal, events } = useModalControls();
	const dispatch = useDispatch();
	
	// list of equips that can go in slot, dictionary of equips list, list of equips by tier
	const [ equipList, equipListIndex, tierList ] = useMemo( () => {
		const equipType = equippable[ info?.ship.equipType[ info.index ] ];
		const equipList = equipType ? equipData.filter( ( { type } ) => equipType.includes( type ) ) : [];
		const tierList = equipType ? equipTier[ info?.ship.equipType[ info.index ] ] : [];
		
		return [
			equipList,
			equipList.reduce( ( res, item ) => {
				res[ item.id ] = item;
				return res;
			}, {} as typeof equipsIndex ),
			reduce( tierList, ( arr, val, key ) => {
				arr[ val[ 1 ] ] = {
					...equipsIndex[ key ],
					tier: <TierIcon tier={val[ 0 ] + 1}/>
				};
				return arr;
			}, [] as ( Equip & { tier?: number } )[] )
		];
	}, [] );
	
	// equipment currently in that slot
	const currentEquip = equipsIndex[ info?.ship.equip[ info.index ][ 0 ] ] || equipData[ 0 ];
	// equipment that will go in slot
	const [ equip, setEquip ] = useState<Equip>( () => {
		if ( selectedEquip?.id && equipListIndex[ selectedEquip.id ] )
			return selectedEquip;
		else if ( currentEquip.id )
			return currentEquip;
		else
			return null;
	} );
	const newEquip = equip || equipData[ 0 ];
	const [ override, setOverride ] = useState<0 | 1>( () => info?.ship.equip[ info.index ]?.[ 1 ] || 0 );
	const [ anchorEl, setAnchorEl ] = useState<HTMLElement>( null );
	
	// saves info on close
	useEventListener( events, 'close', ( cancel ) => {
		setAnchorEl( null );
		if ( cancel ) return;
		if ( info?.ship.equip[ info.index ][ 0 ] === newEquip.id && info?.ship.equip[ info.index ][ 1 ] === override )
			return;
		
		const shipEquip = cloneDeep( info.ship.equip );
		shipEquip[ info.index ] = [ newEquip.id, override, 6 ];
		getTier( fleetData[ info.ship.id ], shipEquip );
		dispatch( fleet_setShip( { name: info.ship.id, ship: { equip: shipEquip } } ) );
	}, { dependencies: [ newEquip, override ] } );
	
	return (
		<Fragment>
			<DialogTitle>Switch Equipment</DialogTitle>
			<DialogContent>
				<Grid container alignItems='center' justifyContent='center'>
					{info?.ship.special[ info.index ] ? (
						<Grid item xs={12} component={Box} pb={2}>
							<Alert severity='warning' variant='filled'>
								Special Equip Slot (Check Skills & Equipment)
							</Alert>
						</Grid>
					) : undefined}
					<Grid item container xs={5} justifyContent='center'>
						<Image
							src={`/images/equips/${currentEquip.image}.png`}
							alt={currentEquip.name}
							height={128}
							width={128}
							layout='intrinsic'
							className={`color-${rarityColors[ currentEquip.rarity ]}`}
						/>
					</Grid>
					<Grid item xs={2}>
						<Typography variant='h4' align='center'>⇒</Typography>
					</Grid>
					<Grid item container xs={5} justifyContent='center'>
						<Image
							src={`/images/equips/${newEquip.image}.png`}
							alt={newEquip.name}
							height={128}
							width={128}
							layout='intrinsic'
							className={`color-${rarityColors[ newEquip.rarity ]}`}
							onClick={() => setEquip( null )}
						/>
					</Grid>
					<Grid item container xs={5} justifyContent='center'>
						<Link
							target='_blank'
							href={`https://azurlane.koumakan.jp/wiki/${decodeURIComponent( currentEquip.image.replaceAll( '$', '%' ) )}`}
							align='center'
							color='textPrimary'>
							{currentEquip.name}
						</Link>
					</Grid>
					<Grid item xs={2}/>
					<Grid item container xs={5} justifyContent='center'>
						<Link
							target='_blank'
							href={`https://azurlane.koumakan.jp/wiki/${decodeURIComponent( newEquip.image.replaceAll( '$', '%' ) )}`}
							align='center'
							color='textPrimary'>
							{newEquip.name}
						</Link>
					</Grid>
					<Grid item container xs={12} md={6} justifyContent='center'>
						<Button
							variant='outlined'
							onClick={( { currentTarget } ) => setAnchorEl( currentTarget )}>
							Equipment Tier
						</Button>
						<EquipTierSelector
							anchorEl={anchorEl}
							closeAnchor={() => setAnchorEl( null )}
							equipList={tierList}
							setEquip={( id ) => setEquip( equipListIndex[ id ] )}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<EquipFilter
							equipList={equipList}
							value={equip}
							setValue={setEquip}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<FormControlLabel
					control={(
						<Switch
							checked={Boolean( override )}
							onChange={( { target } ) => setOverride( +target.checked as 0 | 1 )}
						/>
					)}
					label='Force BiS'
					labelPlacement='start'
					sx={{ mr: 2 }}
				/>
				<Button variant='contained' onClick={() => closeModal()}>
					Close
				</Button>
				<Button
					variant='contained'
					color='error'
					onClick={() => closeModal( true )}>
					Cancel
				</Button>
			</DialogActions>
		</Fragment>
	);
}
