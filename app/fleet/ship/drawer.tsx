import pget from '@/src/helpers/pget';
import { useModal } from '@/src/providers/modal';
import DrawerWrapper from '@/src/providers/modal/drawer';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fleetActions } from '@/src/store/reducers/fleetReducer';
import { ArrowForward as ArrowForwardIcon, Star as StarIcon } from '@mui/icons-material';
import {
	Box,
	DialogTitle,
	drawerClasses,
	Grid2,
	Link,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import { Fragment, useMemo } from 'react';
import { indexBy } from 'remeda';
import { rarityColors } from '../../colors';
import { AffinityIcons, TierIcon } from '../tierIcon';
import type { FleetType, Ship } from '../type';
import EquipModal from './equip/modal';
import type { EquipType } from './equip/type';

export default function ShipDrawer({
	ship,
	filterMeta,
	selectedEquip,
	...data
}: {
	ship?: Ship;
	filterMeta?: (false | { tier?; major?; minor? })[];
	selectedEquip?: EquipType;
} & FleetType) {
	const ships = useAppSelector(pget('fleet.ships'));
	const dispatch = useAppDispatch();
	const { showModal } = useModal();

	const equipIndex = useMemo(() => indexBy(data.equipData, pget('id')), []);

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
		<DrawerWrapper
			anchor='bottom'
			sx={{
				[`.${drawerClasses.paper}`]: {
					justifySelf: 'center',
					maxWidth: 800,
					borderRadius: '16px 16px 0 0',
				},
			}}>
			<DialogTitle>
				<Link
					href={`https://azurlane.koumakan.jp/wiki/${ship.id}`}
					target='_blank'
					underline='none'
					color='textPrimary'>
					{ship.name}
				</Link>
			</DialogTitle>
			<Grid2 container spacing={1} sx={{ alignItems: 'center', p: 2 }}>
				<Grid2 size={4}>
					<Typography variant='subtitle2'>Rarity</Typography>
					<Typography>{ship.rarity}</Typography>
				</Grid2>
				<Grid2 size={4}>
					<Typography variant='subtitle2'>Faction</Typography>
					<Typography>{ship.faction}</Typography>
				</Grid2>
				<Grid2 size={4}>
					<Typography variant='subtitle2'>Type</Typography>
					<Typography>{ship.type}</Typography>
				</Grid2>
				<Grid2 size={4}>
					<Typography>Tier: {tier}</Typography>
				</Grid2>
				<Grid2 size={4}>
					<Typography variant='subtitle2'>Love</Typography>
					<Select
						fullWidth
						value={ships[ship.id]?.love || 0}
						renderValue={(value) => AffinityIcons[value]}
						onChange={({ target }) => {
							dispatch(
								fleetActions.setShip({
									name: ship.id,
									ship: { love: target.value as number },
								}),
							);
						}}>
						{AffinityIcons.map((icon, i) => (
							<MenuItem key={i} value={i}>
								{icon}
							</MenuItem>
						))}
					</Select>
				</Grid2>
				<Grid2 size={4}>
					<Typography variant='subtitle2'>Max Level</Typography>
					<Select
						fullWidth
						value={ships[ship.id]?.lvl || 0}
						renderValue={(value) => (value === 126 ? <StarIcon fontSize='small' /> : value)}
						onChange={({ target }) => {
							dispatch(
								fleetActions.setShip({
									name: ship.id,
									ship: { lvl: target.value as number },
								}),
							);
						}}>
						{[0, 70, 80, 90, 100, 105, 110, 115, 120, 125].map((value) => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
						<MenuItem value={126}>
							<StarIcon />
						</MenuItem>
					</Select>
				</Grid2>
				<Grid2 container size={12} sx={{ alignItems: 'center', justifyContent: 'center' }}>
					{[...Array(5)].map((_, index) => {
						const val = ship.equip[index];
						const equip = equipIndex[val?.[0]];
						const meta = filterMeta?.[index];
						return (
							<Grid2
								key={index}
								size={{ xs: 4, sm: 'grow' }}
								sx={{
									p: 1,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
								onClick={() => {
									showModal(EquipModal, {
										id: 'equip',
										props: { info: { ship, index }, selectedEquip, ...data },
									});
								}}>
								<Image
									src={
										equip?.image
											? `https://azurlane.netojuu.com/images/${equip.image}`
											: '/images/emptyEquip.png'
									}
									alt={equip?.name ?? 'Empty'}
									height={128}
									width={128}
									className={`color-${rarityColors[equip?.rarity]}`}
								/>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<TierIcon tier={val?.[2]} />
									{meta ? (
										<Fragment>
											<ArrowForwardIcon />
											<TierIcon tier={meta.tier + 1 || val?.[2]} />
										</Fragment>
									) : undefined}
								</Box>
							</Grid2>
						);
					})}
				</Grid2>
			</Grid2>
		</DrawerWrapper>
	);
}
