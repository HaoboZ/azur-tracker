import { Button, Grid } from '@mui/material';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { map } from 'lodash-es';
import type { GetStaticProps } from 'next';
import Page from '../../components/page';
import { PageLinkComponent } from '../../components/page/link';
import { useData } from '../../providers/data';
import type { TierType } from './type';

// noinspection JSUnusedGlobalSymbols
export default function Tier() {
	const { tierTypesData } = useData<TierType>();
	
	return (
		<Page title='Tier'>
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

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async () => {
	const { data } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Tiers', tqx: 'out:csv' }
	} );
	
	return { props: { tierTypesData: map( await csvtojson().fromString( data ), 'type' ) } };
};
