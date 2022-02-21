import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import PageSection from '../../components/page/section';
import { opSiWeakness } from './data';

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
									<Box sx={{ position: 'relative', width: 64, height: 64 }}>
										<Image
											src={image}
											alt={ship}
											layout='fill'
											objectFit='contain'
											objectPosition='left'
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
