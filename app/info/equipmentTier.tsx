import PageSection from '@/components/page/section';
import { useData } from '@/src/providers/data';
import { Box, Grid, Input, Stack } from '@mui/joy';
import Image from 'next/image';
import { useState } from 'react';
import { rarityColors } from '../colors';
import type { EquipType } from '../fleet/ship/equip/type';
import { TierIcon } from '../fleet/tierIcon';
import type { FarmType } from './type';

export default function EquipmentTier({ equipIndex }: { equipIndex: Record<string, EquipType> }) {
	const { equipTier } = useData<FarmType>();

	const [search, setSearch] = useState('');
	const lowercaseSearch = search.toLowerCase();

	return (
		<PageSection title='Equipment Tier'>
			<Input
				placeholder='Search'
				value={search}
				onChange={({ target }) => setSearch(target.value)}
			/>
			{search && (
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
										<Grid key={equipId}>
											<Image
												key={equipId}
												src={`https://azurlane.netojuu.com/images/${equip.image}`}
												alt={equip.name}
												height={48}
												width={48}
												className={`color-${rarityColors[equip.rarity]}`}
											/>
										</Grid>
									);
								})}
							</Grid>
						</Box>
					))}
				</Stack>
			)}
		</PageSection>
	);
}
