'use client';
import PageBack from '@/components/page/back';
import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import MultiSortable from '@/components/sortable/multi';
import pget from '@/src/helpers/pget';
import { Grid2, Paper, Stack, Tooltip } from '@mui/material';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { filter, indexBy, isIncludedIn, isNot, mapValues, omit } from 'remeda';
import useEffectAfter from '../../../src/hooks/useEffectAfter';
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

		tiers.unTiered = filter(equipData, isNot(isIncludedIn(Object.values(tiers).flat())));
		return tiers;
	});

	useEffectAfter(() => setChanged(true), [tiers]);

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
					<Grid2 ref={ref} container spacing={1} sx={{ minHeight: 65 }}>
						{list}
					</Grid2>
				)}
				renderItem={(item, containerProps, handleProps) => (
					<Grid2 {...containerProps} {...handleProps}>
						<Tooltip title={item.name}>
							<Image
								src={`https://azurlane.netojuu.com/images/${item.image}`}
								alt={item.name}
								width={48}
								height={48}
								className={`color-${rarityColors[item.rarity]}`}
							/>
						</Tooltip>
					</Grid2>
				)}>
				{({ unTiered, ...tiers }) => (
					<Grid2 container spacing={1}>
						<Grid2 size={6}>
							<Paper variant='outlined' sx={{ p: 1 }}>
								{unTiered}
							</Paper>
						</Grid2>
						<Grid2 size={6}>
							<Stack spacing={1}>
								{Object.entries(tiers).map(([group, tier]) => (
									<Paper key={group} variant='outlined' sx={{ p: 1 }}>
										{tier}
									</Paper>
								))}
							</Stack>
						</Grid2>
					</Grid2>
				)}
			</MultiSortable>
		</PageContainer>
	);
}
