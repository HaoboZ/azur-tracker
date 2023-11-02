import { rarityColors } from '@/app/colors';
import pget from '@/src/helpers/pget';
import useEventListener from '@/src/hooks/useEventListener';
import { useModalControls } from '@/src/providers/modal';
import ModalWrapper from '@/src/providers/modal/dialog';
import { useAppDispatch } from '@/src/store/hooks';
import { fleetActions } from '@/src/store/reducers/fleetReducer';
import {
	Alert,
	Button,
	DialogActions,
	DialogTitle,
	Grid,
	Link,
	ModalClose,
	ModalDialog,
	Switch,
	Typography,
} from '@mui/joy';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { indexBy, pipe, sortBy } from 'remeda';
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
	useEventListener(events, 'close', (cancel) => {
		const _equip = info.ship.equip[info.index];
		if (cancel || (_equip?.[0] === equip?.id && _equip?.[1] === override)) return;

		const shipEquip = structuredClone(info.ship.equip);
		shipEquip[info.index] = equip ? [equip?.id, override, 6] : ([] as any);
		getTier(data.equippableData, data.equipTierData, data.fleetData[info.ship.id], shipEquip);
		dispatch(fleetActions.setShip({ name: info.ship.id, ship: { equip: shipEquip } }));
		info.ship.equip = shipEquip;
	});

	return (
		<ModalWrapper
			sx={{ 'display': 'flex', 'justifyContent': 'center', '--ModalDialog-maxWidth': '500px' }}>
			<ModalDialog>
				<DialogTitle>Switch Equipment</DialogTitle>
				<ModalClose />
				<Grid container spacing={1}>
					{info.ship.special[info.index] ? (
						<Grid xs={12}>
							<Alert variant='solid' color='warning'>
								Special Equip Slot (Check Skills & Equipment)
							</Alert>
						</Grid>
					) : undefined}
					<Grid xs={5} display='flex' flexDirection='column' alignItems='center'>
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
								variant='plain'
								color='neutral'>
								{currentEquip.name}
							</Link>
						)}
					</Grid>
					<Grid xs={2} display='flex' justifyContent='center' alignItems='center'>
						<Typography level='h4'>⇒</Typography>
					</Grid>
					<Grid xs={5} display='flex' flexDirection='column' alignItems='center'>
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
								variant='plain'
								color='neutral'>
								{equip.name}
							</Link>
						)}
					</Grid>
					<Grid xs={12} md={6}>
						<EquipTierSelector
							equipList={tierList}
							setEquip={(id) => setEquip(equipListIndex[id])}
						/>
					</Grid>
					<Grid xs={12} md={6}>
						<EquipFilter equipList={equipList} value={equip} setValue={setEquip} />
					</Grid>
				</Grid>
				<DialogActions>
					<Button onClick={() => closeModal()}>Close</Button>
					<Button variant='plain' color='neutral' onClick={() => closeModal(true)}>
						Cancel
					</Button>
					<Switch
						startDecorator='Force BiS'
						checked={Boolean(override)}
						onChange={({ target }) => setOverride(+target.checked)}
					/>
				</DialogActions>
			</ModalDialog>
		</ModalWrapper>
	);
}
