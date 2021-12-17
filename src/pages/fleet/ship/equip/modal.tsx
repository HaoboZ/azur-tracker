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
import { cloneDeep, reduce } from 'lodash';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import useEventEffect from '../../../../lib/hooks/useEventEffect';
import { useModalControls } from '../../../../lib/providers/modal';
import { fleet_setShip } from '../../../../lib/store/reducers/fleetReducer';
import { rarityColors } from '../../../colors';
import fleetData from '../../data';
import getTier from '../../getTier';
import { TierIcon } from '../../tierIcon';
import equipData, { equippable, equipsIndex, equipTier } from './data';
import EquipFilter from './filter';
import EquipTierSelector from './tierSelector';

export default function EquipModal( { info, selectedEquip }: {
	info: { ship: typeof fleetData[string], index: number },
	selectedEquip?: typeof equipData[number]
} ) {
	const { closeModal, events } = useModalControls();
	const dispatch = useDispatch();
	
	// list of equips that can go in slot, dictionary of equips list, list of equips by tier
	const [ equipList, equipListIndex, tierList ] = useMemo( () => {
		const equipType = equippable[ info?.ship.equipType[ info.index ] ];
		const equipList = equipType ? equipData.filter( ( { type } ) => equipType.includes( type ) ) : [];
		equipList.unshift( equipData[ 0 ] );
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
			}, [] as ( typeof equipData[number] & { tier?: number } )[] )
		];
	}, [] );
	
	// equipment currently in that slot
	const currentEquip = equipsIndex[ info?.ship.equip[ info.index ][ 0 ] ] || equipData[ 0 ];
	// equipment that will go in slot
	const [ equip, setEquip ] = useState<typeof equipData[number]>( () => {
		if ( selectedEquip?.id && equipListIndex[ selectedEquip.id ] )
			return selectedEquip;
		else if ( currentEquip.id )
			return currentEquip;
		else
			return equipData[ 0 ];
	} );
	const [ override, setOverride ] = useState<0 | 1>( () => info?.ship.equip[ info.index ]?.[ 1 ] || 0 );
	const [ anchorEl, setAnchorEl ] = useState<HTMLElement>( null );
	
	// saves info on close
	useEventEffect( events, 'close', ( cancel ) => {
		if ( info?.ship.equip[ info.index ][ 0 ] !== equip.id ) {
			setAnchorEl( null );
			if ( cancel ) return;
			const newEquip = cloneDeep( info.ship.equip );
			newEquip[ info.index ] = [ equip.id, override, 6 ];
			getTier( fleetData[ info.ship.id ], newEquip );
			dispatch( fleet_setShip( { name: info.ship.id, ship: { equip: newEquip } } ) );
		}
	}, [ equip, override ] );
	
	return (
		<>
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
							src={`/images/equips/${ currentEquip.image }.png`}
							alt={currentEquip.name}
							height={128}
							width={128}
							layout='intrinsic'
							className={`color-${ rarityColors[ currentEquip.rarity ] }`}
						/>
					</Grid>
					<Grid item xs={2}>
						<Typography variant='h4' align='center'>⇒</Typography>
					</Grid>
					<Grid item container xs={5} justifyContent='center'>
						<Image
							src={`/images/equips/${ equip.image }.png`}
							alt={equip.name}
							height={128}
							width={128}
							layout='intrinsic'
							className={`color-${ rarityColors[ equip.rarity ] }`}
							onClick={() => setEquip( equipData[ 0 ] )}
						/>
					</Grid>
					<Grid item container xs={5} justifyContent='center'>
						<Link
							target='_blank'
							href={`https://azurlane.koumakan.jp/wiki/${ decodeURIComponent( currentEquip.image.replaceAll( '$', '%' ) ) }`}
							align='center'
							color='textPrimary'>
							{currentEquip.name}
						</Link>
					</Grid>
					<Grid item xs={2}/>
					<Grid item container xs={5} justifyContent='center'>
						<Link
							target='_blank'
							href={`https://azurlane.koumakan.jp/wiki/${ decodeURIComponent( equip.image.replaceAll( '$', '%' ) ) }`}
							align='center'
							color='textPrimary'>
							{equip.name}
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
		</>
	);
}
