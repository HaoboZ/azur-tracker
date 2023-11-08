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
	FormLabel,
	Grid,
	Link,
	Option,
	Select,
	Typography,
} from '@mui/joy';
import Image from 'next/image';
import { Fragment, useMemo } from 'react';
import { indexBy } from 'remeda';
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
				'height': 'unset',
				'display': 'flex',
				'justifyContent': 'center',
				'--Drawer-verticalSize': 0,
				[`.${drawerClasses.content}`]: { overflow: 'hidden', maxWidth: 800 },
			}}>
			<DialogTitle>
				<Link
					href={`https://azurlane.koumakan.jp/wiki/${ship.id}`}
					target='_blank'
					variant='plain'
					color='neutral'>
					{ship.name}
				</Link>
			</DialogTitle>
			<Grid container spacing={1} alignItems='center' p={2}>
				<Grid xs={4}>
					<FormLabel>Rarity</FormLabel>
					<Typography>{ship.rarity}</Typography>
				</Grid>
				<Grid xs={4}>
					<FormLabel>Faction</FormLabel>
					<Typography>{ship.faction}</Typography>
				</Grid>
				<Grid xs={4}>
					<FormLabel>Type</FormLabel>
					<Typography>{ship.type}</Typography>
				</Grid>
				<Grid xs={4}>
					<Typography>Tier: {tier}</Typography>
				</Grid>
				<Grid xs={4}>
					<FormLabel>Love</FormLabel>
					<Select
						value={ships[ship.id]?.love || 0}
						renderValue={({ value }) => AffinityIcons[value]}
						onChange={(_, value) => {
							dispatch(fleetActions.setShip({ name: ship.id, ship: { love: value } }));
						}}>
						{AffinityIcons.map((icon, i) => (
							<Option key={i} value={i}>
								{icon}
							</Option>
						))}
					</Select>
				</Grid>
				<Grid xs={4}>
					<FormLabel>Max Level</FormLabel>
					<Select
						value={ships[ship.id]?.lvl || 0}
						renderValue={({ value }) => (value === 126 ? <StarIcon fontSize='xl' /> : value)}
						onChange={(_, value) => {
							dispatch(fleetActions.setShip({ name: ship.id, ship: { lvl: value } }));
						}}>
						{[0, 70, 80, 90, 100, 105, 110, 115, 120, 125].map((value) => (
							<Option key={value} value={value}>
								{value}
							</Option>
						))}
						<Option value={126}>
							<StarIcon />
						</Option>
					</Select>
				</Grid>
				<Grid container xs={12} alignItems='center' justifyContent='center'>
					{[...Array(5)].map((_, index) => {
						const val = ship.equip[index];
						const equip = equipIndex[val?.[0]];
						const meta = filterMeta?.[index];
						return (
							<Grid
								key={index}
								sm
								xs={4}
								p={1}
								display='flex'
								flexDirection='column'
								alignItems='center'
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
									alt={equip?.name}
									height={128}
									width={128}
									className={`color-${rarityColors[equip?.rarity]}`}
								/>
								<Box display='flex' alignItems='center'>
									<TierIcon tier={val?.[2]} />
									{meta ? (
										<Fragment>
											<ArrowForwardIcon />
											<TierIcon tier={meta.tier + 1 || val?.[2]} />
										</Fragment>
									) : undefined}
								</Box>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		</DrawerWrapper>
	);
}
