import PageSection from '@/components/page/section';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';

const opSiWeakness: [string, string, string][] = [
	['f/f1/Enforcer_VIII_Determination.png', 'Determination', 'Airstrikes'],
	['e/eb/Enforcer_IX_Exploration.png', 'Exploration', 'Airstrikes'],
	['1/14/Enforcer_IX_Concealment.png', 'Concealment', 'Shelling'],
	['9/9e/Enforcer_XIV_Equilibrium.png', 'Equilibrium', 'Shelling'],
	['4/45/Enforcer_XIV_Harmony.png', 'Harmony', 'Torpedoes'],
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
