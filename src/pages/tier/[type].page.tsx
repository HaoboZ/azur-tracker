import { Box, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { getDatabase, ref, set } from 'firebase/database';
import { difference, keyBy, map, sortBy } from 'lodash-es';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useAsyncEffect, useDebouncedValue } from 'rooks';
import Loading from '../../components/loaders/loading';
import Page from '../../components/page';
import Sortable from '../../components/sortable';
import firebaseClientApp from '../../firebase/client';
import { useData } from '../../providers/data';
import Error from '../_error.page';
import { rarityColors } from '../colors';
import type { EquipType } from '../fleet/ship/equip/type';
import type { TierType } from './type';

const db = getDatabase( firebaseClientApp );

const SortGrid = forwardRef<HTMLDivElement, { children: ReactNode }>( ( { children }, ref ) => (
	<Grid
		ref={ref}
		container
		component={Paper}
		spacing={1}
		overflow='hidden'
		minHeight={110}
		pb={1}
		mb={1}>
		{children}
	</Grid>
) );

export default function TierType() {
	const router = useRouter();
	const { equipData } = useData<TierType>();
	const equipIndex = useMemo( () => keyBy( equipData, 'id' ), [] );
	
	const tierRef = ref( db, `tiers/${router.query.type}` );
	const [ data, loading, error ] = useObjectVal<Record<string, string[]>>( tierRef );
	
	const [ changed, setChanged ] = useState( false );
	const [ unTiered, setUnTiered ] = useState( [] );
	const tier0 = useState<EquipType[]>( [] );
	const tier1 = useState<EquipType[]>( [] );
	const tier2 = useState<EquipType[]>( [] );
	const tier3 = useState<EquipType[]>( [] );
	const tier4 = useState<EquipType[]>( [] );
	const tierN = useState<EquipType[]>( [] );
	
	const [ save ] = useDebouncedValue( changed, 1000 );
	
	useEffect( () => {
		if ( loading || error ) return;
		let equipIds = map( equipData, 'id' );
		[
			{ tier: tier0, dataId: '0' },
			{ tier: tier1, dataId: '1' },
			{ tier: tier2, dataId: '2' },
			{ tier: tier3, dataId: '3' },
			{ tier: tier4, dataId: '4' },
			{ tier: tierN, dataId: 'N' }
		].map( ( { tier, dataId } ) => {
			if ( !data?.[ dataId ] ) return;
			tier[ 1 ]( data[ dataId ].map( ( id ) => equipIndex[ id ] ) );
			equipIds = difference( equipIds, data[ dataId ] );
		} );
		setUnTiered( equipIds.map( ( id ) => equipIndex[ id ] ) );
	}, [ loading, error ] );
	
	useAsyncEffect( async () => {
		if ( !save ) return;
		await set( tierRef, {
			0: map( tier0[ 0 ], 'id' ),
			1: map( tier1[ 0 ], 'id' ),
			2: map( tier2[ 0 ], 'id' ),
			3: map( tier3[ 0 ], 'id' ),
			4: map( tier4[ 0 ], 'id' ),
			N: map( tierN[ 0 ], 'id' )
		} );
		setChanged( false );
	}, [ save ] );
	
	if ( loading ) return <Loading/>;
	if ( error ) return <Error statusCode={error.name} statusText={error.message}/>;
	
	return (
		<Page title={router.query.type as string}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Sortable<EquipType>
						group='tier'
						items={unTiered}
						setItems={setUnTiered}
						tag={SortGrid}
						renderItem={( { item, handleClass } ) => (
							<Grid item sx={{ width: 100, height: 100 }}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={`https://azurlane.netojuu.com/images/${item.image}`}
									alt={item.name}
									height='100%'
									className={`color-${rarityColors[ item.rarity ]} ${handleClass}`}
								/>
							</Grid>
						)}
					/>
				</Grid>
				<Grid item xs={6}>
					{[ tier0, tier1, tier2, tier3, tier4, tierN ].map( ( [ tier, setTier ], index ) => (
						<Box key={index}>
							<Typography sx={{ mb: 2 }}>Tier {index === 5 ? 'N' : index}</Typography>
							<Sortable<EquipType>
								group='tier'
								items={tier}
								setItems={( items ) => {
									setTier( items );
									setChanged( true );
								}}
								tag={SortGrid}
								renderItem={( { item, handleClass } ) => (
									<Grid item sx={{ width: 100, height: 100 }}>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={`https://azurlane.netojuu.com/images/${item.image}`}
											alt={item.name}
											height='100%'
											className={`color-${rarityColors[ item.rarity ]} ${handleClass}`}
										/>
									</Grid>
								)}
							/>
						</Box>
					) )}
				</Grid>
			</Grid>
		</Page>
	);
}

// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Tiers', tqx: 'out:csv' }
	} );
	
	return {
		paths   : map( await csvtojson().fromString( data ), ( { type } ) => ( { params: { type } } ) ),
		fallback: true
	};
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async ( { params } ) => {
	const { data: tierTypesCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: {
			sheet: 'Tiers',
			tqx  : 'out:csv',
			tq   : `SELECT B,C WHERE A='${params.type as string}'`
		}
	} );
	const tierTypes = JSON.parse( `[${tierTypesCSV}]` );
	const { data: equipCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Equip&tqx=out:csv&tq=SELECT%20*%20WHERE%20G=%27${tierTypes[ 0 ]}%27`, {
		params: {
			sheet: 'Tiers',
			tqx  : 'out:csv',
			key  : 0,
			tq   : `SELECT * WHERE G='${tierTypes[ 0 ]}'${tierTypes[ 1 ] ? ` OR G='${tierTypes[ 1 ]}'` : ''}`
		}
	} );
	
	return {
		props: {
			equipData: sortBy( ( await csvtojson().fromString( equipCSV ) )
				.map( ( { id, dps, ...val } ) => ( { id: +id, dps: +dps, ...val } ) ), 'dps', 'id' )
				.reverse()
		}
	};
};
