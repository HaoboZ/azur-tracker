import PageSection from '@/components/page/section';
import { Table } from '@mui/joy';
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
			<Table sx={{ 'th:nth-child(1)': { width: 67 } }}>
				<thead>
					<tr>
						<th />
						<th>Ship</th>
						<th>Weakness</th>
					</tr>
				</thead>
				<tbody>
					{opSiWeakness.map(([image, ship, weakness], index) => (
						<tr key={index}>
							<td>
								<Image
									src={`https://azurlane.netojuu.com/images/${image}`}
									alt={ship}
									width={48}
									height={48}
									style={{ objectFit: 'contain' }}
								/>
							</td>
							<td>{ship}</td>
							<td>{weakness}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</PageSection>
	);
}
