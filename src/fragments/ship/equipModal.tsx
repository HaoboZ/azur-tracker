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
import React from 'react';
import { useDispatch } from 'react-redux';

import { rarityColors } from '../../data/colors';
import { equippable, equips, equipsIndex, equipTier } from '../../data/equipData';
import shipRef from '../../data/shipData';
import { TierIcon } from '../../lib/icons';
import { useModalControls } from '../../lib/providers/modal';
import { ship_setShip } from '../../lib/store/reducers/shipReducer';
import EquipFilter from './equipFilter';
import EquipTierSelector from './equipTierSelector';

export default function EquipModal( { info, selectedEquip }: {
	info: { ship: typeof shipRef[string], index: number },
	selectedEquip?: typeof equips[number]
} ) {
	const controls = useModalControls();
	const dispatch = useDispatch();
	
	// list of equips that can go in slot, dictionary of equips list, list of equips by tier
	const [ equipList, equipListIndex, tierList ] = React.useMemo( () => {
		const equipType = equippable[ info?.ship.equipType[ info.index ] ];
		const equipList = equipType ? equips.filter( ( { type } ) => equipType.includes( type ) ) : [];
		equipList.unshift( equips[ 0 ] );
		
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
			}, [] as ( typeof equips[number] & { tier?: number } )[] )
		];
	}, [] );
	
	// equipment currently in that slot
	const currentEquip = equipsIndex[ info?.ship.equip[ info.index ][ 0 ] ] || equips[ 0 ];
	// equipment that will go in slot
	const [ equip, setEquip ] = React.useState<typeof equips[number]>( () => {
		if ( selectedEquip?.id && equipListIndex[ selectedEquip.id ] )
			return selectedEquip;
		else if ( currentEquip.id )
			return currentEquip;
		else
			return equips[ 0 ];
	} );
	const [ override, setOverride ] = React.useState<0 | 1>( () => info?.ship.equip[ info.index ]?.[ 1 ] || 0 );
	const [ anchorEl, setAnchorEl ] = React.useState<HTMLElement>( null );
	
	// saves info on close
	React.useEffect( () => {
		function close( cancel ) {
			setAnchorEl( null );
			if ( cancel ) return;
			const newEquip = cloneDeep( info.ship.equip );
			newEquip[ info.index ] = [ equip.id, override, 6 ];
			dispatch( ship_setShip( { name: info.ship.id, ship: { equip: newEquip } } ) );
		}
		controls.events.on( 'close', close );
		return () => {
			controls.events.off( 'close', close );
		};
	}, [ equip, override ] );
	
	return <>
		<DialogTitle>Switch Equipment</DialogTitle>
		<DialogContent>
			<Grid container alignItems='center' justifyContent='center'>
				{info?.ship.special[ info.index ] ?
					<Grid item xs={12} component={Box} pb={2}>
						<Alert severity='warning' variant='filled'>
							Special Equip Slot (Check Skills & Equipment)
						</Alert>
					</Grid> : undefined}
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
						onClick={() => setEquip( equips[ 0 ] )}
						src={`/images/equips/${equip.image}.png`}
						alt={equip.name}
						height={128}
						width={128}
						layout='intrinsic'
						className={`color-${rarityColors[ equip.rarity ]}`}
					/>
				</Grid>
				<Grid item container xs={5} justifyContent='center'>
					<Link
						target='_blank'
						href={`https://azurlane.koumakan.jp/${unescape( currentEquip.image.replace( '$', '%' ) )}`}
						align='center'
						color='textPrimary'>
						{currentEquip.name}
					</Link>
				</Grid>
				<Grid item xs={2}/>
				<Grid item container xs={5} justifyContent='center'>
					<Link
						target='_blank'
						href={`https://azurlane.koumakan.jp/${unescape( equip.image.replace( '$', '%' ) )}`}
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
				control={<Switch
					checked={Boolean( override )}
					onChange={( { target } ) => setOverride( +target.checked as any )}
				/>}
				label='Force BiS'
				labelPlacement='start'
				sx={{ mr: 2 }}
			/>
			<Button variant='contained' onClick={() => controls.closeModal()}>
				Close
			</Button>
			<Button
				variant='contained'
				color='error'
				onClick={() => controls.closeModal( true )}>
				Cancel
			</Button>
		</DialogActions>
	</>;
}
