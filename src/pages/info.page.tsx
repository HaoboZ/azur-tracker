import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import concealmentImage from '../../public/images/other/concealment.png';
import determinationImage from '../../public/images/other/determination.png';
import equilibriumImage from '../../public/images/other/equilibrium.png';
import explorationImage from '../../public/images/other/exploration.png';
import harmonyImage from '../../public/images/other/harmony.png';
import PageContainer from '../components/page/container';
import PageSection from '../components/page/section';
import PageTitle from '../components/page/title';

const opsi: [ StaticImageData, string, string ][] = [
	[ determinationImage, 'Determination', 'Airstrikes' ],
	[ explorationImage, 'Exploration', 'Airstrikes' ],
	[ concealmentImage, 'Concealment', 'Shelling' ],
	[ equilibriumImage, 'Equilibrium', 'Shelling' ],
	[ harmonyImage, 'Harmony', 'Torpedoes' ]
];

// noinspection JSUnusedGlobalSymbols
export default function Info() {
	return <PageContainer>
		<Head><title>Info | Azur Lane Tracker</title></Head>
		<PageTitle>Info</PageTitle>
		<PageSection primary='OpSi Weakness'>
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
						{opsi.map( ( [ image, name, weak ], index ) => <TableRow key={index}>
							<TableCell>
								<Box sx={{ position: 'relative', width: 50, height: 50 }}>
									<Image src={image} alt={name} layout='fill' objectFit='contain' objectPosition='left'/>
								</Box>
							</TableCell>
							<TableCell>{name}</TableCell>
							<TableCell>{weak}</TableCell>
						</TableRow> )}
					</TableBody>
				</Table>
			</TableContainer>
		</PageSection>
		<PageSection primary='Archive Farming'>
			TBA
		</PageSection>
	</PageContainer>;
}
