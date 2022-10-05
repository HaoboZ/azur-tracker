import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PageSection from '../../components/page/section';

const opSiWeakness: [ string, string, string ][] = [
	[ 'f/f1/Enforcer_VIII_Determination.png', 'Determination', 'Airstrikes' ],
	[ 'e/eb/Enforcer_IX_Exploration.png', 'Exploration', 'Airstrikes' ],
	[ '1/14/Enforcer_IX_Concealment.png', 'Concealment', 'Shelling' ],
	[ '9/9e/Enforcer_XIV_Equilibrium.png', 'Equilibrium', 'Shelling' ],
	[ '4/45/Enforcer_XIV_Harmony.png', 'Harmony', 'Torpedoes' ]
];

export default function OpSiWeakness() {
	return (
		<PageSection primary='Operation Siren Weakness'>
			<TableContainer component={Paper}>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell/>
							<TableCell>Ship</TableCell>
							<TableCell>Weakness</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{opSiWeakness.map( ( [ image, ship, weakness ], index ) => (
							<TableRow key={index}>
								<TableCell>
									<Box position='relative' width={64} height={64}>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={`https://azurlane.netojuu.com/images/${image}`}
											alt={ship}
											height='100%'
										/>
									</Box>
								</TableCell>
								<TableCell>{ship}</TableCell>
								<TableCell>{weakness}</TableCell>
							</TableRow>
						) )}
					</TableBody>
				</Table>
			</TableContainer>
		</PageSection>
	);
}
