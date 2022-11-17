'use client';
import Page from '@/components/page';
import { PageLinkComponent } from '@/components/page/link';
import { useAuth } from '@/src/providers/auth';
import { useData } from '@/src/providers/data';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { TierType } from './type';

// noinspection JSUnusedGlobalSymbols
export default function Tier() {
	const router = useRouter();
	const user = useAuth();
	const { tierTypesData } = useData<TierType>();
	
	return (
		<Page
			hideBack
			title='Tier'
			titleProps={{
				actions: user?.uid === process.env.NEXT_PUBLIC_ADMIN_ID && [ {
					name   : 'Revalidate',
					onClick: () => router.refresh()
				} ]
			}}>
			<Grid container spacing={2} pt={2}>
				{tierTypesData.map( ( type ) => (
					<Grid key={type} item xs={6} sm={4} md={3} lg={2}>
						<Button
							variant='contained'
							color='secondary'
							component={PageLinkComponent}
							href={`/tier/${type}`}
							sx={{
								height        : 50,
								display       : 'flex',
								alignItems    : 'center',
								justifyContent: 'center',
								textAlign     : 'center'
							}}>
							{type}
						</Button>
					</Grid>
				) )}
			</Grid>
		</Page>
	);
}
