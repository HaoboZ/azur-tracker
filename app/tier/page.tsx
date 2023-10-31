import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import { auth } from '@/src/auth';
import pget from '@/src/helpers/pget';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'Tier | Azur Lane Tracker' };

export default async function TierPage() {
	const session = await auth();
	if (session?.user.role !== 'ADMIN') notFound();

	const { data } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Tier', tqx: 'out:csv' } },
	);

	return (
		<PageContainer>
			<PageTitle>Tier</PageTitle>
			<Grid container spacing={2} pt={2}>
				{(await csvtojson().fromString(data)).map(pget('type')).map((type) => (
					<Grid key={type} item xs={6} sm={4} md={3} lg={2}>
						<Button
							variant='contained'
							color='secondary'
							component={Link}
							href={`/tier/${type}`}
							sx={{
								height: 50,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								textAlign: 'center',
							}}>
							{type}
						</Button>
					</Grid>
				))}
			</Grid>
		</PageContainer>
	);
}
