import PageSection from '@/components/page/section';
import { useData } from '@/src/providers/data';
import { Box, Grid, Stack, TextField } from '@mui/material';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { indexBy } from 'remeda';
import { rarityColors } from '../colors';
import { TierIcon } from '../fleet/tierIcon';
import type { FarmType } from './type';

export default function EquipmentTier() {
	const { equipTier, equipList } = useData<FarmType>();

	const [search, setSearch] = useState('');

	const equipIndex = useMemo(() => indexBy(equipList, ({ id }) => id), []);

	const lowercaseSearch = search.toLowerCase();

	return (
		<PageSection title='Equipment Tier'>
			<TextField
				fullWidth
				label='search'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Stack spacing={1}>
				{equipTier.map((value, index) => (
					<Box key={index}>
						<TierIcon tier={index + 1} />
						<Grid container spacing={1}>
							{value.map((equipId) => {
								const equip = equipIndex[equipId];
								if (
									lowercaseSearch &&
									equip.name.toLowerCase().indexOf(lowercaseSearch) === -1
								)
									return;

								return (
									<Grid key={equipId} item>
										<Image
											key={equipId}
											src={`https://azurlane.netojuu.com/images/${equip.image}`}
											alt={equip.name}
											height={50}
											width={50}
											className={`color-${rarityColors[equip.rarity]}`}
										/>
									</Grid>
								);
							})}
						</Grid>
					</Box>
				))}
			</Stack>
		</PageSection>
	);
}
