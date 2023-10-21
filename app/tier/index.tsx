'use client';
import PageContainer from '@/components/page/container';
import { PageLinkComponent } from '@/components/page/link';
import PageTitle from '@/components/page/title';
import { useData } from '@/src/providers/data';
import { Button, Grid } from '@mui/material';
import type { TierType } from './type';

export default function Tier() {
	const { tierTypesData } = useData<TierType>();

	return (
		<PageContainer>
			<PageTitle>Tier</PageTitle>
			<Grid container spacing={2} pt={2}>
				{tierTypesData.map((type) => (
					<Grid key={type} item xs={6} sm={4} md={3} lg={2}>
						<Button
							variant='contained'
							color='secondary'
							component={PageLinkComponent}
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
