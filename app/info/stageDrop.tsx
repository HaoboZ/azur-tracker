import PageSection from '@/components/page/section';
import { useData } from '@/src/providers/data';
import { Box, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { mapValues, pickBy } from 'remeda';
import EquipFilter from '../fleet/ship/equip/filter';
import type { EquipType } from '../fleet/ship/equip/type';
import StageDropAccordion from './stageDropAccordion';
import type { FarmType } from './type';

export default function StageDrop({ equipIndex }: { equipIndex: Record<string, EquipType> }) {
	const { farmData, equipList } = useData<FarmType>();

	const [equip, setEquip] = useState<EquipType>(null);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => setExpanded(Boolean(equip)), [equip]);

	const stages = useMemo(() => {
		if (!equip) return farmData;
		return pickBy(
			mapValues(farmData, (stage) => pickBy(stage, (level) => level.includes(equip.id))),
			(stage) => Boolean(Object.keys(stage).length),
		);
	}, [equip]);

	return (
		<PageSection title='Notable Equipment Drops'>
			<EquipFilter equipList={equipList} value={equip} setValue={setEquip} />
			<Button fullWidth variant='outlined' onClick={() => setExpanded(!expanded)}>
				{expanded ? 'Collapse' : 'Expand'} All
			</Button>
			<Box>
				{Object.entries(stages).map(([stage, levels]) => (
					<StageDropAccordion
						key={stage}
						stage={stage}
						levels={levels}
						equipIndex={equipIndex}
						expand={expanded}
						setEquip={setEquip}
					/>
				))}
			</Box>
		</PageSection>
	);
}
