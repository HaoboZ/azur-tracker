import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import { auth } from '@/src/auth';
import pget from '@/src/helpers/pget';
import { Button, Grid2 } from '@mui/material';
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
			<Grid2 container spacing={1} sx={{ pt: 2 }}>
				{(await csvtojson().fromString(data)).map(pget('type')).map((type) => (
					<Grid2 key={type} size={{ xs: 6, sm: 4, md: 3 }}>
						<Button fullWidth variant='contained' component={Link} href={`/tier/${type}`}>
							{type}
						</Button>
					</Grid2>
				))}
			</Grid2>
		</PageContainer>
	);
}
