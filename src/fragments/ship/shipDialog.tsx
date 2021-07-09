import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	Link,
	MenuItem,
	Select,
	Theme,
	Typography,
	useMediaQuery,
	Zoom
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { TableInstance } from 'react-table';

import SVGIcon, { TierIcon } from '../../lib/icons';
import { rarityColors, tierColors, useMappedColorClasses } from '../../lib/reference/colors';
import { equips, equipsIndex } from '../../lib/reference/equipRef';
import shipRef from '../../lib/reference/shipRef';
import { ship_setShip } from '../../lib/store/reducers/shipReducer';
import EquipDialog from './equipDialog';

const Transition = React.forwardRef( ( props: TransitionProps, ref: React.ForwardedRef<typeof Zoom> ) =>
	<Zoom ref={ref} {...props}/> );

export default function ShipDialog( { table, open, onClose, onExit, ship, equipBetter = [] }: {
	table: TableInstance,
	open: boolean,
	onClose: () => void,
	onExit?: () => void,
	ship?: typeof shipRef[string],
	equipBetter?: number[]
} ) {
	const dispatch = useDispatch();
	const colorClasses = useMappedColorClasses();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	const [ equipOpen, setEquipOpen ] = React.useState( false ),
	      [ equipInfo, setEquipInfo ] = React.useState<{ ship, index }>();
	
	return <Dialog
		open={open}
		onClose={onClose}
		TransitionComponent={Transition}
		TransitionProps={{ onExited: onExit }}
		keepMounted
		maxWidth='sm'
		fullWidth
		onKeyPress={( e ) => {
			if ( e.key === 'Enter' ) {
				e.preventDefault();
				onClose();
			}
		}}>
		<Link
			href={ship.link}
			target='_blank'
			color='textPrimary'>
			<DialogTitle>{ship.name}</DialogTitle>
		</Link>
		<DialogContent>
			<Grid container spacing={2} alignItems='center'>
				<Grid item xs={4}>
					<InputLabel shrink>Rarity</InputLabel>
					<Typography>{ship.rarity}</Typography>
				</Grid>
				<Grid item xs={4}>
					<InputLabel shrink>Faction</InputLabel>
					<Typography>{ship.faction}</Typography>
				</Grid>
				<Grid item xs={4}>
					<InputLabel shrink>Type</InputLabel>
					<Typography>{ship.type}</Typography>
				</Grid>
				<Grid item xs={3}>
					<Typography>Tier: {ship.tier === 121 ? <SVGIcon name='star'/> : ship.tier}</Typography>
				</Grid>
				<Grid item xs>
					<FormControl fullWidth>
						<InputLabel>Love</InputLabel>
						<Select
							label='Love'
							fullWidth
							value={ship.love}
							SelectDisplayProps={{ style: { textAlign: 'center' } }}
							onChange={( e ) =>
								dispatch( ship_setShip( ship.id, { love: e.target.value as number } ) )}>
							<MenuItem value={0}>
								<SVGIcon name='emptyHeart'/>
							</MenuItem>
							<MenuItem value={1}>
								<SVGIcon name='heart'/>
							</MenuItem>
							<MenuItem value={2}>
								<SVGIcon name='ring'/>
							</MenuItem>
							<MenuItem value={3}>
								<SVGIcon name='ring'/>
								<SVGIcon name='heart'/>
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs>
					<FormControl fullWidth>
						<InputLabel>Max Level</InputLabel>
						<Select
							label='Max Level'
							fullWidth
							value={ship.lvl}
							SelectDisplayProps={{ style: { textAlign: 'center' } }}
							onChange={( e ) =>
								dispatch( ship_setShip( ship.id, { lvl: e.target.value as number } ) )}>
							<MenuItem value={0}>0</MenuItem>
							<MenuItem value={70}>70</MenuItem>
							<MenuItem value={80}>80</MenuItem>
							<MenuItem value={90}>90</MenuItem>
							<MenuItem value={100}>100</MenuItem>
							<MenuItem value={105}>105</MenuItem>
							<MenuItem value={110}>110</MenuItem>
							<MenuItem value={115}>115</MenuItem>
							<MenuItem value={120}>120</MenuItem>
							<MenuItem value={121}>
								<svg height={14} width={14}>
									<use xlinkHref='#star'/>
								</svg>
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} container alignItems='center' justifyContent='center'>
					{ship.equip.map( ( val, index ) => {
						const equip = equipsIndex[ val[ 0 ] ] || equips[ 0 ];
						return <Grid
							key={index}
							item
							xs={wide ? true : 4}
							sx={{
								padding      : 1,
								display      : 'flex',
								flexDirection: 'column',
								alignItems   : 'center'
							}}
							className={colorClasses[ tierColors[ equipBetter[ index ] - 1 ] ]}
							onClick={() => {
								setEquipInfo( { ship, index } );
								setEquipOpen( true );
							}}>
							<Image
								src={`/images/equips/${equip.image}.png`}
								alt={equip.name}
								height={128}
								width={128}
								layout='intrinsic'
								className={colorClasses[ rarityColors[ equip.rarity ] ]}
							/>
							<TierIcon tier={val[ 2 ]}/>
						</Grid>;
					} )}
				</Grid>
			</Grid>
		</DialogContent>
		<DialogActions>
			<Button variant='contained' onClick={onClose}>
				Close
			</Button>
		</DialogActions>
		<EquipDialog
			open={equipOpen}
			onClose={() => setEquipOpen( false )}
			info={equipInfo}
			selectedEquip={table.state.filters.find( ( filter ) => filter.id === 'equip' )?.value}
		/>
	</Dialog>;
}
