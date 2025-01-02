import PageSection from '@/components/page/section';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';

const opSiWeakness: [string, string, string][] = [
	[
		'thumb/9/9f/Enforcer_VIII_DeterminationChibi.png/250px-Enforcer_VIII_DeterminationChibi.png',
		'Determination',
		'Airstrikes',
	],
	[
		'thumb/7/78/Enforcer_IX_ExplorationChibi.png/250px-Enforcer_IX_ExplorationChibi.png',
		'Exploration',
		'Airstrikes',
	],
	[
		'thumb/1/12/Enforcer_IX_ConcealmentChibi.png/250px-Enforcer_IX_ConcealmentChibi.png',
		'Concealment',
		'Shelling',
	],
	[
		'thumb/e/eb/Enforcer_XIV_EquilibriumChibi.png/182px-Enforcer_XIV_EquilibriumChibi.png',
		'Equilibrium',
		'Shelling',
	],
	[
		'thumb/6/67/Enforcer_XIV_HarmonyChibi.png/222px-Enforcer_XIV_HarmonyChibi.png',
		'Harmony',
		'Torpedoes',
	],
];

export default function OpSiWeakness() {
	return (
		<PageSection title='Operation Siren Weakness'>
			<TableContainer>
				<Table sx={{ 'th:nth-child(1)': { width: 67 } }}>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Ship</TableCell>
							<TableCell>Weakness</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{opSiWeakness.map(([image, ship, weakness], index) => (
							<TableRow key={index}>
								<TableCell>
									<Image
										src={`https://azurlane.netojuu.com/images/${image}`}
										alt={ship}
										width={48}
										height={48}
										style={{ objectFit: 'contain' }}
									/>
								</TableCell>
								<TableCell>{ship}</TableCell>
								<TableCell>{weakness}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</PageSection>
	);
}
