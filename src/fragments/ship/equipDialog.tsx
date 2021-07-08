import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid,
	Link,
	Switch,
	Typography,
	Zoom
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { Alert } from '@material-ui/lab';
import { reduce } from 'lodash';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';

import { TierIcon } from '../../lib/icons';
import { rarityColors, useMappedColorClasses } from '../../lib/reference/colors';
import { equippable, equips, equipsIndex, equipTier } from '../../lib/reference/equipRef';
import shipRef from '../../lib/reference/shipRef';
import { ship_setShip } from '../../lib/store/reducers/shipReducer';
import EquipFilter from './equipFilter';
import EquipTierSelector from './equipTierSelector';

const Transition = React.forwardRef( ( props: TransitionProps, ref: React.ForwardedRef<typeof Zoom> ) =>
	<Zoom ref={ref} {...props}/> );

export default function EquipDialog( { open, onClose, info, selectedEquip }: {
	open: boolean,
	onClose: () => void,
	info: { ship: typeof shipRef[string], index: number },
	selectedEquip?: typeof equips[number]
} ) {
	const dispatch = useDispatch();
	const colorClasses = useMappedColorClasses();
	
	// list of equips that can go in slot, dictionary of equips list, list of equips by tier
	const [ equipList, equipListIndex, tierList ] = React.useMemo( () => {
		const equipType = equippable[ info?.ship.equipType[ info.index ] ];
		const equipList = equipType ? equips.filter( ( item ) => equipType.includes( item.type ) ) : [];
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
	}, [ info ] );
	
	// equipment currently in that slot
	const currentEquip = equipsIndex[ info?.ship.equip[ info.index ][ 0 ] ] || equips[ 0 ];
	// equipment that will go in slot
	const [ equip, setEquip ] = React.useState<typeof equips[number]>( equips[ 0 ] );
	React.useEffect( () => {
		if ( selectedEquip?.id && equipListIndex[ selectedEquip.id ] )
			setEquip( selectedEquip );
		else if ( currentEquip.id )
			setEquip( currentEquip );
		else
			setEquip( equips[ 0 ] );
	}, [ info, selectedEquip ] );
	
	const [ override, setOverride ] = React.useState<0 | 1>( 0 );
	React.useEffect( () => {
		setOverride( info?.ship.equip[ info.index ]?.[ 1 ] || 0 );
	}, [ info ] );
	
	const [ anchorEl, setAnchorEl ] = React.useState<HTMLElement>( null );
	
	function close() {
		info.ship.equip[ info.index ] = [ equip.id, override, 6 ];
		dispatch( ship_setShip( info.ship.id, { equip: info.ship.equip } ) );
		setAnchorEl( null );
		onClose();
	}
	
	return <Dialog
		open={open}
		onClose={close}
		TransitionComponent={Transition}
		TransitionProps={{ onExited: () => setEquip( equips[ 0 ] ) }}
		keepMounted
		maxWidth='xs'
		fullWidth
		onKeyPress={( e ) => {
			if ( e.key === 'Enter' ) {
				e.preventDefault();
				close();
			}
		}}>
		<DialogTitle>Switch Equipment?</DialogTitle>
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
						className={colorClasses[ rarityColors[ currentEquip.rarity ] ]}
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
						className={colorClasses[ rarityColors[ equip.rarity ] ]}
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
						onClick={( e ) => setAnchorEl( e.currentTarget )}>
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
					color='primary'
					checked={Boolean( override )}
					onChange={( e ) => setOverride( +e.target.checked as any )}
				/>}
				label='Force BiS'
				labelPlacement='start'
			/>
			<Button variant='contained' color='primary' onClick={close}>
				Close
			</Button>
			<Button
				variant='contained'
				color='secondary'
				onClick={() => {
					setAnchorEl( null );
					onClose();
				}}>
				Cancel
			</Button>
		</DialogActions>
	</Dialog>;
}
