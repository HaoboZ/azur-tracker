'use client';
import PageBack from '@/components/page/back';
import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import MultiSortable from '@/components/sortable/multi';
import pget from '@/src/helpers/pget';
import { Grid, Sheet, Stack } from '@mui/joy';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { difference, indexBy, mapValues, omit } from 'remeda';
import { useDidUpdate } from 'rooks';
import { rarityColors } from '../../colors';
import type { EquipType } from '../../fleet/ship/equip/type';
import { updateTier } from './updateTier';

export default function TierType({
	type,
	equipTier,
	equipData,
}: {
	type: string;
	equipTier: Record<string, number[]>;
	equipData: EquipType[];
}) {
	const equipIndex = useMemo(() => indexBy(equipData, pget('id')), []);

	const [changed, setChanged] = useState(false);
	const [tiers, setTiers] = useState(() => {
		const tiers = mapValues(equipTier, (ids) => ids.map((id) => equipIndex[id]));
		tiers.unTiered = difference(equipData, Object.values(tiers).flat());
		return tiers;
	});

	useDidUpdate(() => setChanged(true), [tiers]);

	return (
		<PageContainer>
			<PageBack />
			<PageTitle
				actions={[
					{
						name: 'Save',
						onClick: async () => {
							await updateTier(
								type,
								mapValues(omit(tiers, ['unTiered']), (equips) => equips.map(pget('id'))),
							);
							setChanged(false);
						},
						buttonProps: { disabled: !changed },
					},
				]}>
				{type}
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
							width={48}
							height={48}
							className={`color-${rarityColors[item.rarity]}`}
						/>
					</Grid>
				)}>
				{({ unTiered, ...tiers }) => (
					<Grid container spacing={1}>
						<Grid xs={6}>
							<Sheet variant='outlined' sx={{ p: 1 }}>
								{unTiered}
							</Sheet>
						</Grid>
						<Grid xs={6}>
							<Stack spacing={1}>
								{Object.entries(tiers).map(([group, tier]) => (
									<Sheet key={group} variant='outlined' sx={{ p: 1 }}>
										{tier}
									</Sheet>
								))}
							</Stack>
						</Grid>
					</Grid>
				)}
			</MultiSortable>
		</PageContainer>
	);
}
