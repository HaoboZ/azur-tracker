import {
	Box,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	Link,
	MenuItem,
	Select,
	Typography,
	Zoom,
	ZoomProps
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AdaptiveModalContainer, ModalVariant } from '../../components/adaptiveModal';
import { rarityColors } from '../../data/colors';
import { equips, equipsIndex } from '../../data/equipData';
import shipRef from '../../data/shipData';
import SVGIcon, { TierIcon } from '../../lib/icons';
import { useModal, useModalControls } from '../../lib/providers/modal';
import { ship_setShip } from '../../lib/store/reducers/shipReducer';
import EquipModal from './equipModal';

const TransitionComponent = React.forwardRef( ( props: ZoomProps, ref: React.ForwardedRef<typeof Zoom> ) =>
	<Zoom ref={ref} {...props}/> );

export default function ShipModal( { ship, equipBetter = [], selectedEquip }: {
	ship?: typeof shipRef[string],
	equipBetter?: [ number, number ][],
	selectedEquip?: typeof equips[number]
} ) {
	const controls = useModalControls();
	const ships = useSelector( ( { ship } ) => ship.ships );
	const dispatch = useDispatch();
	const { showModal } = useModal();
	
	// calculates tier
	const tier = React.useMemo( () => {
		switch ( ship.tier ) {
		case 7:
			return '?';
		case 6:
			return 'N';
		case 0:
			return 'EX';
		default:
			return ship.tier - 1;
		}
	}, [ ship.tier ] );
	
	return <AdaptiveModalContainer
		onClose={() => controls.closeModal()}
		title={<Link
			href={ship.link}
			target='_blank'
			color='textPrimary'>
			<DialogTitle>{ship.name}</DialogTitle>
		</Link>}
		variant={ModalVariant.bottom}>
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
					<Typography>Tier: {tier}</Typography>
				</Grid>
				<Grid item xs>
					<FormControl fullWidth>
						<InputLabel>Love</InputLabel>
						<Select
							label='Love'
							fullWidth
							value={ships[ ship.id ]?.love || 0}
							SelectDisplayProps={{ style: { textAlign: 'center' } }}
							onChange={( { target } ) => dispatch( ship_setShip( {
								name: ship.id,
								ship: { love: target.value as number }
							} ) )}>
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
							value={ships[ ship.id ]?.lvl || 0}
							SelectDisplayProps={{ style: { textAlign: 'center' } }}
							onChange={( { target } ) => dispatch( ship_setShip( {
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
							xs={4}
							sm
							p={1}
							display='flex'
							flexDirection='column'
							alignItems='center'
							onClick={() => showModal( EquipModal, {
								variant : ModalVariant.center,
								maxWidth: 'xs',
								TransitionComponent
							}, { info: { ship, index }, selectedEquip } )}>
							<Image
								src={`/images/equips/${equip.image}.png`}
								alt={equip.name}
								height={128}
								width={128}
								layout='intrinsic'
								className={`color-${rarityColors[ equip.rarity ]}`}
							/>
							<Box>
								<TierIcon tier={val[ 2 ]}/>
								{equipBetter[ index ]?.[ 1 ] ? <>
									<SVGIcon name='arrow'/>
									<TierIcon tier={equipBetter[ index ][ 0 ] + 1}/>
								</> : undefined}
							</Box>
						</Grid>;
					} )}
				</Grid>
			</Grid>
		</DialogContent>
	</AdaptiveModalContainer>;
}
