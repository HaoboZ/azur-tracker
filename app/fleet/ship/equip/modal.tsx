import pget from '@/src/helpers/pget';
import useEventListener from '@/src/hooks/useEventListener';
import { useModalControls } from '@/src/providers/modal';
import DialogWrapper from '@/src/providers/modal/dialog';
import { useAppDispatch } from '@/src/store/hooks';
import { fleetActions } from '@/src/store/reducers/fleetReducer';
import {
	Alert,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid2,
	Link,
	Switch,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { indexBy, pipe, sortBy } from 'remeda';
import { rarityColors } from '../../../colors';
import getTier from '../../getTier';
import { TierIcon } from '../../tierIcon';
import type { FleetType, Ship } from '../../type';
import EquipFilter from './filter';
import EquipTierSelector from './tierSelector';
import type { EquipType } from './type';

export default function EquipModal({
	info,
	selectedEquip,
	...data
}: { info: { ship: Ship; index: number }; selectedEquip?: EquipType } & FleetType) {
	const { closeModal, events } = useModalControls();
	const dispatch = useAppDispatch();

	const equipIndex = useMemo(() => indexBy(data.equipData, pget('id')), []);

	// list of equips that can go in slot, dictionary of equips list, list of equips by tier
	const [equipList, equipListIndex, tierList] = useMemo(() => {
		const equipType = data.equippableData[info.ship.equipType[info.index]]?.equip;
		const equipList = equipType
			? data.equipData.filter(({ type }) => equipType.includes(type))
			: [];
		const tierList =
			(equipType &&
				data.equipTierData[data.equippableData[info.ship.equipType[info.index]]?.tier]) ??
			{};

		return [
			equipList,
			equipList.reduce<typeof equipIndex>((res, item) => {
				res[item.id] = item;
				return res;
			}, {}),
			pipe(Object.entries(tierList), sortBy(pget('1.1')), sortBy(pget('1.0'))).map((val) => ({
				...equipIndex[val[0]],
				tier: <TierIcon tier={val[1][0] + 1} />,
			})),
		];
	}, []);

	// equipment currently in that slot
	const currentEquip = equipIndex[info.ship.equip[info.index]?.[0]];
	// equipment that will go in slot
	const [equip, setEquip] = useState<EquipType>(() => {
		if (selectedEquip?.id && equipListIndex[selectedEquip.id]) return selectedEquip;
		else if (currentEquip) return currentEquip;
		else return null;
	});
	const [override, setOverride] = useState(() => info.ship.equip[info.index]?.[1] || 0);

	// saves info on close
	useEventListener(events, 'close', (close) => {
		const _equip = info.ship.equip[info.index];
		if (!close || (_equip?.[0] === equip?.id && _equip?.[1] === override)) return;

		const shipEquip = structuredClone(info.ship.equip);
		shipEquip[info.index] = equip ? [equip?.id, override, 6] : ([] as any);
		getTier(data.equippableData, data.equipTierData, data.fleetData[info.ship.id], shipEquip);
		dispatch(fleetActions.setShip({ name: info.ship.id, ship: { equip: shipEquip } }));
		info.ship.equip = shipEquip;
	});

	return (
		<DialogWrapper maxWidth='sm'>
			<DialogTitle>Switch Equipment</DialogTitle>
			<DialogContent>
				<Grid2 container spacing={1}>
					{info.ship.special[info.index] ? (
						<Grid2 size={12}>
							<Alert variant='filled' color='warning'>
								Special Equip Slot (Check Skills & Equipment)
							</Alert>
						</Grid2>
					) : undefined}
					<Grid2
						size={5}
						sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
						<Image
							src={
								currentEquip?.image
									? `https://azurlane.netojuu.com/images/${currentEquip.image}`
									: '/images/emptyEquip.png'
							}
							alt={currentEquip?.name ?? 'empty'}
							height={128}
							width={128}
							className={`color-${rarityColors[currentEquip?.rarity]}`}
						/>
						{currentEquip && (
							<Link
								target='_blank'
								href={`https://azurlane.koumakan.jp/wiki/${currentEquip.href}`}
								underline='none'
								color='textPrimary'
								sx={{ textAlign: 'center' }}>
								{currentEquip.name}
							</Link>
						)}
					</Grid2>
					<Grid2
						size={2}
						sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Typography variant='h4'>⇒</Typography>
					</Grid2>
					<Grid2
						size={5}
						sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
						<Image
							src={
								equip?.image
									? `https://azurlane.netojuu.com/images/${equip.image}`
									: '/images/emptyEquip.png'
							}
							alt={equip?.name ?? 'empty'}
							height={128}
							width={128}
							className={`color-${rarityColors[equip?.rarity]}`}
							onClick={() => setEquip(null)}
						/>
						{equip && (
							<Link
								target='_blank'
								href={`https://azurlane.koumakan.jp/wiki/${equip.href}`}
								underline='none'
								color='textPrimary'
								sx={{ textAlign: 'center' }}>
								{equip.name}
							</Link>
						)}
					</Grid2>
					<Grid2 size={{ xs: 12, md: 6 }}>
						<EquipTierSelector
							equipList={tierList}
							setEquip={(id) => setEquip(equipListIndex[id])}
						/>
					</Grid2>
					<Grid2 size={{ xs: 12, md: 6 }}>
						<EquipFilter equipList={equipList} value={equip} setValue={setEquip} />
					</Grid2>
				</Grid2>
			</DialogContent>
			<DialogActions>
				<FormControlLabel
					label='Force BiS'
					control={
						<Switch
							checked={Boolean(override)}
							onChange={({ target }) => setOverride(+target.checked)}
						/>
					}
				/>
				<Button variant='contained' onClick={() => closeModal(true)}>
					Close
				</Button>
				<Button color='error' onClick={() => closeModal()}>
					Cancel
				</Button>
			</DialogActions>
		</DialogWrapper>
	);
}
