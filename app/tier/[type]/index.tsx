'use client';
import Loading from '@/components/loaders/loading';
import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import MultiSortable from '@/components/sortable/multi';
import firebaseClientApp from '@/src/firebase/client';
import { useData } from '@/src/providers/data';
import { Grid, Paper, Stack } from '@mui/material';
import { getDatabase, ref, set } from 'firebase/database';
import Image from 'next/image';
import { difference, indexBy, map, omit, path } from 'rambdax';
import { useEffect, useMemo, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { rarityColors } from '../../colors';
import Error from '../../error';
import type { EquipType } from '../../fleet/ship/equip/type';
import type { TierType } from '../type';

const db = getDatabase(firebaseClientApp);

export default function TierType() {
	const { params, equipData } = useData<TierType>();
	const equipIndex = useMemo(() => indexBy('id', equipData), []);

	const tierRef = ref(db, `tiers/${decodeURIComponent(params.type)}`);
	const [data, loading, error] = useObjectVal<Record<string, number[]>>(tierRef);

	const [changed, setChanged] = useState(false);
	const [tiers, setTiers] = useState<Record<string, EquipType[]>>({
		'unTiered': [],
		'0': [],
		'1': [],
		'2': [],
		'3': [],
		'4': [],
		'N': [],
	});

	useEffect(() => {
		if (loading || error) return;
		const tiers = map((ids: number[]) => map((id) => equipIndex[id], ids), data);
		tiers.unTiered = difference(equipData, Object.values(tiers).flat());
		setTiers(tiers);
	}, [loading, error]);

	// useWillUnmount(async () => {
	// 	if (!changed) return;
	// 	await set(
	// 		tierRef,
	// 		map(
	// 			(equips) => map(path('id'), equips),
	// 			omit<Record<string, EquipType[]>>('unTiered', tiers),
	// 		),
	// 	);
	// });

	if (loading) return <Loading />;
	if (error) return <Error error={error} />;

	return (
		<PageContainer>
			<PageTitle
				actions={[
					{
						name: 'Save',
						onClick: async () => {
							await set(
								tierRef,
								map(
									(equips) => map(path('id'), equips),
									omit<Record<string, EquipType[]>>('unTiered', tiers),
								),
							);
							setChanged(false);
						},
						buttonProps: { disabled: !changed },
					},
				]}>
				{decodeURIComponent(params.type)}
			</PageTitle>
			<MultiSortable<EquipType>
				groups={tiers}
				setGroups={setTiers}
				renderItems={(list, ref) => (
					<Grid ref={ref} container spacing={1} minHeight={65}>
						{list}
					</Grid>
				)}
				renderItem={(item, containerProps, handleProps) => (
					<Grid item {...containerProps} {...handleProps}>
						<Image
							src={`https://azurlane.netojuu.com/images/${item.image}`}
							alt={item.name}
							width={50}
							height={50}
							className={`color-${rarityColors[item.rarity]}`}
						/>
					</Grid>
				)}>
				{({ unTiered, ...tiers }) => (
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Paper sx={{ p: 1 }}>{unTiered}</Paper>
						</Grid>
						<Grid item xs={6}>
							<Stack spacing={1}>
								{Object.entries(tiers).map(([group, tier]) => (
									<Paper key={group} sx={{ p: 1 }}>
										{tier}
									</Paper>
								))}
							</Stack>
						</Grid>
					</Grid>
				)}
			</MultiSortable>
		</PageContainer>
	);
}
