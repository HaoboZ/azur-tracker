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
import { cloneDeep, keyBy, reduce } from 'lodash-es';
import { Fragment, ReactElement, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import useEventListener from '../../../../hooks/useEventListener';
import { useData } from '../../../../providers/data';
import { useModalControls } from '../../../../providers/modal';
import { fleet_setShip } from '../../../../store/reducers/fleetReducer';
import { rarityColors } from '../../../colors';
import getTier from '../../getTier';
import { TierIcon } from '../../tierIcon';
import { FleetType, Ship } from '../../type';
import { equippable, EquipType } from './data';
import EquipFilter from './filter';
import EquipTierSelector from './tierSelector';

// { id: 0, name: '', image: 'Azur_Lane_Wiki', type: undefined as type, rarity: undefined as rarity }

export default function EquipModal( { info, selectedEquip }: {
	info: { ship: Ship, index: number },
	selectedEquip?: EquipType
} ) {
	const { closeModal, events } = useModalControls();
	const dispatch = useDispatch();
	const { fleetData, equipTier, equipData } = useData<FleetType>();
	
	const equipIndex = useMemo( () => keyBy( equipData, 'id' ), [] );
	
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
			}, {} as typeof equipIndex ),
			reduce( tierList, ( arr, val, key ) => {
				arr[ val[ 1 ] ] = {
					...equipIndex[ key ],
					tier: <TierIcon tier={val[ 0 ] + 1}/>
				};
				return arr;
			}, [] as ( EquipType & { tier?: ReactElement } )[] )
		];
	}, [] );
	
	// equipment currently in that slot
	const currentEquip = equipIndex[ info?.ship.equip[ info.index ][ 0 ] ];
	// equipment that will go in slot
	const [ equip, setEquip ] = useState<EquipType>( () => {
		if ( selectedEquip?.id && equipListIndex[ selectedEquip.id ] )
			return selectedEquip;
		else if ( currentEquip )
			return currentEquip;
		else
			return null;
	} );
	const [ override, setOverride ] = useState( () => info?.ship.equip[ info.index ]?.[ 1 ] || 0 );
	const [ anchorEl, setAnchorEl ] = useState<HTMLElement>( null );
	
	// saves info on close
	useEventListener( events, 'close', ( cancel ) => {
		setAnchorEl( null );
		if ( cancel ) return;
		if ( info?.ship.equip[ info.index ][ 0 ] === equip?.id && info?.ship.equip[ info.index ][ 1 ] === override )
			return;
		
		const shipEquip = cloneDeep( info.ship.equip );
		shipEquip[ info.index ] = equip ? [ equip?.id, override, 6 ] : [];
		getTier( equipTier, fleetData[ info.ship.id ], shipEquip );
		dispatch( fleet_setShip( { name: info.ship.id, ship: { equip: shipEquip } } ) );
		info.ship.equip = shipEquip;
	}, { dependencies: [ equip, override ] } );
	
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
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={currentEquip?.image
								? `https://azurlane.netojuu.com/w/images/${currentEquip.image}`
								: '/images/emptyEquip.png'}
							alt={currentEquip?.name}
							height={128}
							width={128}
							className={`color-${rarityColors[ currentEquip?.rarity ]}`}
						/>
					</Grid>
					<Grid item xs={2}>
						<Typography variant='h4' align='center'>⇒</Typography>
					</Grid>
					<Grid item container xs={5} justifyContent='center'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={equip?.image
								? `https://azurlane.netojuu.com/w/images/${equip.image}`
								: '/images/emptyEquip.png'}
							alt={equip?.name}
							height={128}
							width={128}
							className={`color-${rarityColors[ equip?.rarity ]}`}
							onClick={() => setEquip( null )}
						/>
					</Grid>
					<Grid item container xs={5} justifyContent='center'>
						{currentEquip && (
							<Link
								target='_blank'
								href={`https://azurlane.koumakan.jp/wiki/${currentEquip.href}`}
								align='center'
								color='textPrimary'>
								{currentEquip.name}
							</Link>
						)}
					</Grid>
					<Grid item xs={2}/>
					<Grid item container xs={5} justifyContent='center'>
						{equip && (
							<Link
								target='_blank'
								href={`https://azurlane.koumakan.jp/wiki/${equip.href}`}
								align='center'
								color='textPrimary'>
								{equip.name}
							</Link>
						)}
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
							onChange={( { target } ) => setOverride( +target.checked )}
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
