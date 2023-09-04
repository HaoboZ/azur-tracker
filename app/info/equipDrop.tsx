import PageSection from '@/components/page/section';
import { useData } from '@/src/providers/data';
import {
	ChevronRight as ChevronRightIcon,
	ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { TreeItem, treeItemClasses, TreeView } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import { each, keyBy, map, mapValues } from 'lodash';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { rarityColors } from '../colors';
import EquipFilter from '../fleet/ship/equip/filter';
import type { EquipType } from '../fleet/ship/equip/type';
import type { FarmType } from './type';

export default function EquipDrop() {
	const { farmData, equipList } = useData<FarmType>();

	const [expanded, setExpanded] = useState<string[]>([]);
	const [selected, setSelected] = useState<string>(null);

	const [equip, setEquip] = useState<EquipType>(null);

	const equipIndex = useMemo(() => keyBy(equipList, 'id'), []);
	const treeKeys = useMemo(() => map(farmData, (_, level) => level), []);

	const stages = useMemo(
		() =>
			mapValues(farmData, (value) => {
				const stages: Record<string, number[]> = {};
				each(value, (value, stageMajor) =>
					each(value, (value, stageMinor) => {
						if (equip ? value.includes(equip.id) : true)
							stages[`${stageMajor}${stageMinor}`] = value;
					}),
				);
				return Object.keys(stages).length ? stages : null;
			}),
		[equip],
	);

	useEffect(() => {
		setExpanded(equip ? treeKeys : []);
	}, [equip]);

	return (
		<PageSection title='Notable Equipment Drops'>
			<EquipFilter equipList={equipList} value={equip} setValue={setEquip} />
			<Button
				fullWidth
				variant='outlined'
				onClick={() => setExpanded(expanded.length ? [] : treeKeys)}>
				{expanded.length ? 'Collapse' : 'Expand'} All
			</Button>
			<TreeView
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				expanded={expanded}
				selected={selected}
				sx={{
					[`.${treeItemClasses.content}`]: { py: 1 },
					'img:hover': { cursor: 'pointer' },
				}}
				onNodeToggle={(e, nodeIds) => setExpanded(nodeIds)}
				onNodeSelect={(e, nodeId) => setSelected(nodeId)}>
				{map(stages, (value, level) => (
					<TreeItem
						key={level}
						nodeId={level}
						label={level}
						TransitionProps={{
							mountOnEnter: true,
							unmountOnExit: true,
						}}>
						{map(value, (value, stage) => (
							<Box key={stage} py={1} display='flex' flexDirection='row'>
								<Box display='flex' alignItems='center' width={150} pr={1}>
									{stage}
								</Box>
								<Stack direction='row' spacing={1}>
									{map(value, (equipId) => {
										const equip = equipIndex[equipId];
										return (
											<Image
												key={equipId}
												src={`https://azurlane.netojuu.com/images/${equip.image}`}
												alt={equip.name}
												height={40}
												width={40}
												className={`color-${rarityColors[equip.rarity]}`}
												onClick={() => setEquip(equip)}
											/>
										);
									})}
								</Stack>
							</Box>
						))}
					</TreeItem>
				))}
			</TreeView>
		</PageSection>
	);
}
