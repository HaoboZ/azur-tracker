import { ArrowForward as ArrowForwardIcon, Star as StarIcon } from '@mui/icons-material';
import {
	Box,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	Link,
	MenuItem,
	Select,
	Typography,
	Zoom
} from '@mui/material';
import Image from 'next/image';
import { Fragment, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../providers/modal';
import { ResponsiveModalContainer } from '../../../providers/modal/responsiveModal';
import { fleet_setShip } from '../../../store/reducers/fleetReducer';
import { rarityColors } from '../../colors';
import { AffinityIcons, TierIcon } from '../tierIcon';
import { Ship } from '../type';
import equipData, { equipsIndex, EquipType } from './equip/data';
import EquipModal from './equip/modal';

export default function ShipModal( { ship, equipBetter = [], selectedEquip }: {
	ship?: Ship,
	equipBetter?: [ number, number ][],
	selectedEquip?: EquipType
} ) {
	const ships = useSelector( ( { fleet } ) => fleet.ships );
	const dispatch = useDispatch();
	const { showModal } = useModal();
	
	// calculates tier
	const tier = useMemo( () => {
		switch ( ship.tier ) {
		case 7:
			return '?';
		case 6:
			return 'N';
		case -1:
			return 'EX';
		default:
			return ship.tier;
		}
	}, [ ship.tier ] );
	
	return (
		<ResponsiveModalContainer
			title={(
				<Link
					href={ship.href}
					target='_blank'
					color='textPrimary'>
					<DialogTitle>{ship.name}</DialogTitle>
				</Link>
			)}>
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
					<Typography>Tier: {tier}</Typography>
				</Grid>
				<Grid item xs>
					<FormControl fullWidth>
						<InputLabel>Love</InputLabel>
						<Select
							fullWidth
							label='Love'
							value={ships[ ship.id ]?.love || 0}
							SelectDisplayProps={{ style: { textAlign: 'center' } }}
							onChange={( { target } ) => dispatch( fleet_setShip( {
								name: ship.id,
								ship: { love: target.value as number }
							} ) )}>
							{AffinityIcons.map( ( icon, i ) => (
								<MenuItem key={i} value={i}>
									{icon}
								</MenuItem>
							) )}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs>
					<FormControl fullWidth>
						<InputLabel>Max Level</InputLabel>
						<Select
							fullWidth
							label='Max Level'
							value={ships[ ship.id ]?.lvl || 0}
							SelectDisplayProps={{ style: { textAlign: 'center' } }}
							onChange={( { target } ) => dispatch( fleet_setShip( {
								name: ship.id,
								ship: { lvl: target.value as number }
							} ) )}>
							<MenuItem value={0}>0</MenuItem>
							<MenuItem value={70}>70</MenuItem>
							<MenuItem value={80}>80</MenuItem>
							<MenuItem value={90}>90</MenuItem>
							<MenuItem value={100}>100</MenuItem>
							<MenuItem value={105}>105</MenuItem>
							<MenuItem value={110}>110</MenuItem>
							<MenuItem value={115}>115</MenuItem>
							<MenuItem value={120}>120</MenuItem>
							<MenuItem value={125}>125</MenuItem>
							<MenuItem value={126}>
								<StarIcon fontSize='small'/>
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item container xs={12} alignItems='center' justifyContent='center'>
					{ship.equip.map( ( val, index ) => {
						const equip = equipsIndex[ val[ 0 ] ] || equipData[ 0 ];
						
						return (
							<Grid
								key={index}
								item
								sm
								xs={4}
								p={1}
								display='flex'
								flexDirection='column'
								alignItems='center'
								onClick={() => showModal( EquipModal, {
									variant            : 'modal',
									maxWidth           : 'xs',
									TransitionComponent: Zoom,
									props              : { info: { ship, index }, selectedEquip }
								} )}>
								<Image
									src={`/images/equips/${equip.image}.png`}
									alt={equip.name}
									height={128}
									width={128}
									layout='intrinsic'
									className={`color-${rarityColors[ equip.rarity ]}`}
								/>
								<Box display='flex' alignItems='center'>
									<TierIcon tier={val[ 2 ]}/>
									{equipBetter[ index ]?.[ 1 ] ? (
										<Fragment>
											<ArrowForwardIcon fontSize='inherit'/>
											<TierIcon tier={equipBetter[ index ][ 0 ] + 1}/>
										</Fragment>
									) : undefined}
								</Box>
							</Grid>
						);
					} )}
				</Grid>
			</Grid>
		</ResponsiveModalContainer>
	);
}
