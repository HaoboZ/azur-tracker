import { useModal } from '@/src/providers/modal';
import ModalDrawer from '@/src/providers/modal/drawer';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fleetActions } from '@/src/store/reducers/fleetReducer';
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
} from '@mui/material';
import Image from 'next/image';
import { indexBy } from 'rambdax';
import { Fragment, useMemo } from 'react';
import { rarityColors } from '../../colors';
import { AffinityIcons, TierIcon } from '../tierIcon';
import type { FleetType, Ship } from '../type';
import EquipModal from './equip/modal';
import type { EquipType } from './equip/type';

export default function ShipModal({
	ship,
	filterMeta,
	selectedEquip,
	...data
}: {
	ship?: Ship;
	filterMeta?: (false | { tier?; major?; minor? })[];
	selectedEquip?: EquipType;
} & FleetType) {
	const ships = useAppSelector(({ fleet }) => fleet.ships);
	const dispatch = useAppDispatch();
	const { showModal } = useModal();

	const equipIndex = useMemo(() => indexBy('id', data.equipData), []);

	// calculates tier
	const tier = useMemo(() => {
		switch (ship.tier) {
			case 7:
				return '?';
			case 6:
				return 'N';
			case -1:
				return 'EX';
			default:
				return ship.tier;
		}
	}, [ship.tier]);

	return (
		<ModalDrawer
			autoSize
			title={
				<Link
					href={`https://azurlane.koumakan.jp/wiki/${ship.id}`}
					target='_blank'
					color='textPrimary'>
					<DialogTitle>{ship.name}</DialogTitle>
				</Link>
			}>
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
							value={ships[ship.id]?.love || 0}
							SelectDisplayProps={{ style: { textAlign: 'center' } }}
							onChange={({ target }) =>
								dispatch(
									fleetActions.setShip({
										name: ship.id,
										ship: { love: target.value as number },
									}),
								)
							}>
							{AffinityIcons.map((icon, i) => (
								<MenuItem key={i} value={i}>
									{icon}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs>
					<FormControl fullWidth>
						<InputLabel>Max Level</InputLabel>
						<Select
							fullWidth
							label='Max Level'
							value={ships[ship.id]?.lvl || 0}
							SelectDisplayProps={{ style: { textAlign: 'center' } }}
							onChange={({ target }) =>
								dispatch(
									fleetActions.setShip({
										name: ship.id,
										ship: { lvl: target.value as number },
									}),
								)
							}>
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
								<StarIcon fontSize='small' />
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item container xs={12} alignItems='center' justifyContent='center'>
					{[...Array(5)].map((_, index) => {
						const val = ship.equip[index];
						const equip = equipIndex[val?.[0]];
						const meta = filterMeta?.[index];
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
								onClick={() =>
									showModal(EquipModal, {
										id: 'equip',
										props: { info: { ship, index }, selectedEquip, ...data },
									})
								}>
								<Image
									src={
										equip?.image
											? `https://azurlane.netojuu.com/images/${equip.image}`
											: '/images/emptyEquip.png'
									}
									alt={equip?.name}
									height={128}
									width={128}
									className={`color-${rarityColors[equip?.rarity]}`}
								/>
								<Box display='flex' alignItems='center'>
									<TierIcon tier={val?.[2]} />
									{meta ? (
										<Fragment>
											<ArrowForwardIcon fontSize='inherit' />
											<TierIcon tier={meta.tier + 1 || val?.[2]} />
										</Fragment>
									) : undefined}
								</Box>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		</ModalDrawer>
	);
}
