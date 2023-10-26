import PageSection from '@/components/page/section';
import { useData } from '@/src/providers/data';
import {
	ChevronRight as ChevronRightIcon,
	ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { TreeItem, treeItemClasses, TreeView } from '@mui/x-tree-view';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { indexBy, mapValues } from 'remeda';
import { rarityColors } from '../colors';
import EquipFilter from '../fleet/ship/equip/filter';
import type { EquipType } from '../fleet/ship/equip/type';
import type { FarmType } from './type';

export default function EquipDrop() {
	const { farmData, equipList } = useData<FarmType>();

	const [expanded, setExpanded] = useState<string[]>([]);
	const [selected, setSelected] = useState<any>(null);

	const [equip, setEquip] = useState<EquipType>(null);

	const equipIndex = useMemo(() => indexBy(equipList, ({ id }) => id), []);

	const stages = useMemo(
		() =>
			mapValues(farmData, (value) => {
				const stages: Record<string, number[]> = {};
				mapValues(value, (value, stageMajor) => {
					mapValues(value, (value, stageMinor) => {
						if (equip ? value.includes(equip.id) : true)
							stages[`${stageMajor}${stageMinor}`] = value;
					});
				});
				return Object.keys(stages).length ? stages : {};
			}),
		[equip],
	);

	useEffect(() => {
		setExpanded(equip ? Object.keys(farmData) : []);
	}, [equip]);

	return (
		<PageSection title='Notable Equipment Drops'>
			<EquipFilter equipList={equipList} value={equip} setValue={setEquip} />
			<Button
				fullWidth
				variant='outlined'
				onClick={() => setExpanded(expanded.length ? [] : Object.keys(farmData))}>
				{expanded.length ? 'Collapse' : 'Expand'} All
			</Button>
			<TreeView
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				expanded={expanded}
				selected={selected}
				sx={{ [`.${treeItemClasses.content}`]: { py: 1 }, 'img:hover': { cursor: 'pointer' } }}
				onNodeToggle={(e, nodeIds) => setExpanded(nodeIds)}
				onNodeSelect={(e, nodeId) => setSelected(nodeId)}>
				{Object.entries(stages).map(([level, value]) => (
					<TreeItem
						key={level}
						nodeId={level}
						label={level}
						TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}>
						{Object.entries(value).map(([stage, value]) => (
							<Box key={stage} py={1} display='flex' flexDirection='row'>
								<Box display='flex' alignItems='center' width={150} pr={1}>
									{stage}
								</Box>
								<Stack direction='row' spacing={1}>
									{value.map((equipId) => {
										const equip = equipIndex[equipId];
										return (
											<Image
												key={equipId}
												src={`https://azurlane.netojuu.com/images/${equip.image}`}
												alt={equip.name}
												height={50}
												width={50}
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
