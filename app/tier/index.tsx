'use client';
import { Button, Grid } from '@mui/material';
import Page from '../../src/components/page';
import { PageLinkComponent } from '../../src/components/page/link';
import { useData } from '../../src/layout/providers/data';
import type { TierType } from './type';

// noinspection JSUnusedGlobalSymbols
export default function Tier() {
	const { tierTypesData } = useData<TierType>();
	
	return (
		<Page hideBack title='Tier'>
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
