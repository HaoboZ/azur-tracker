import { Accordion, AccordionDetails, AccordionSummary, Table } from '@mui/joy';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { rarityColors } from '../colors';
import type { EquipType } from '../fleet/ship/equip/type';

export default function StageDropAccordion({
	stage,
	levels,
	equipIndex,
	expand,
	setEquip,
}: {
	stage: string;
	levels: Record<string, number[]>;
	equipIndex: Record<string, EquipType>;
	expand?: boolean;
	setEquip: Dispatch<SetStateAction<EquipType>>;
}) {
	const [expanded, setExpanded] = useState(false);

	useEffect(() => setExpanded(expand), [expand]);

	return (
		<Accordion key={stage} expanded={expanded} onChange={(_, expanded) => setExpanded(expanded)}>
			<AccordionSummary>{stage}</AccordionSummary>
			<AccordionDetails>
				<Table sx={{ tableLayout: 'auto' }}>
					<tbody>
						{Object.entries(levels).map(([level, equips]) => (
							<tr key={level}>
								<td>{level}</td>
								<td>
									{equips.map((equipId) => {
										const equip = equipIndex[equipId];

										return (
											<Image
												key={equipId}
												src={`https://azurlane.netojuu.com/images/${equip.image}`}
												alt={equip.name}
												height={48}
												width={48}
												className={`color-${rarityColors[equip.rarity]}`}
												style={{ cursor: 'pointer' }}
												onClick={() => setEquip(equip)}
											/>
										);
									})}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</AccordionDetails>
		</Accordion>
	);
}
