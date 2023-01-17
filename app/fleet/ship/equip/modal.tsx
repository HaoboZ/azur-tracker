import { rarityColors } from '@/app/colors';
import useEventListener from '@/src/hooks/useEventListener';
import { useModalControls } from '@/src/providers/modal';
import ModalDialog from '@/src/providers/modal/dialog';
import { useAppDispatch } from '@/src/store/hooks';
import { fleet_setShip } from '@/src/store/reducers/fleetReducer';
import { Alert, Box, Button, FormControlLabel, Grid, Link, Switch, Typography } from '@mui/material';
import { cloneDeep, keyBy, map, sortBy } from 'lodash';
import Image from 'next/image';
import { Fragment, useMemo, useState } from 'react';
import getTier from '../../getTier';
import { TierIcon } from '../../tierIcon';
import type { FleetType, Ship } from '../../type';
import EquipFilter from './filter';
import EquipTierSelector from './tierSelector';
import type { EquipType } from './type';

export default function EquipModal( { info, selectedEquip, ...data }: {
	info: { ship: Ship, index: number },
	selectedEquip?: EquipType
} & FleetType ) {
	const { closeModal, events } = useModalControls();
	const dispatch = useAppDispatch();
	
	const equipIndex = useMemo( () => keyBy( data.equipData, 'id' ), [] );
	
	// list of equips that can go in slot, dictionary of equips list, list of equips by tier
	const [ equipList, equipListIndex, tierList ] = useMemo( () => {
		const equipType = data.equippableData[ info?.ship.equipType[ info.index ] ]?.equip;
		const equipList = equipType ? data.equipData.filter( ( { type } ) => equipType.includes( type ) ) : [];
		const tierList = ( equipType && data.equipTierData[ data.equippableData[ info?.ship.equipType[ info.index ] ]?.tier ] ) ?? {};
		
		return [
			equipList,
			equipList.reduce<typeof equipIndex>( ( res, item ) => {
				res[ item.id ] = item;
				return res;
			}, {} ),
			map( sortBy( Object.entries( tierList ), ( val ) => val[ 1 ][ 0 ], ( val ) => val[ 1 ][ 1 ] ), ( val ) => ( {
				...equipIndex[ val[ 0 ] ],
				tier: <TierIcon tier={val[ 1 ][ 0 ] + 1}/>
			} ) )
		];
	}, [] );
	
	// equipment currently in that slot
	const currentEquip = equipIndex[ info?.ship.equip[ info.index ]?.[ 0 ] ];
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
		if ( info?.ship.equip[ info.index ]?.[ 0 ] === equip?.id && info?.ship.equip[ info.index ]?.[ 1 ] === override )
			return;
		
		const shipEquip = cloneDeep( info.ship.equip );
		shipEquip[ info.index ] = equip ? [ equip?.id, override, 6 ] : [] as any;
		getTier( data.equippableData, data.equipTierData, data.fleetData[ info.ship.id ], shipEquip );
		dispatch( fleet_setShip( { name: info.ship.id, ship: { equip: shipEquip } } ) );
		info.ship.equip = shipEquip;
	} );
	
	return (
		<ModalDialog
			title='Switch Equipment'
			maxWidth='xs'
			actions={(
				<Fragment>
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
				</Fragment>
			)}>
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
						src={currentEquip?.image
							? `https://azurlane.netojuu.com/images/${currentEquip.image}`
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
					<Image
						src={equip?.image
							? `https://azurlane.netojuu.com/images/${equip.image}`
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
		</ModalDialog>
	);
}
