'use client';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { getDatabase, ref, set } from 'firebase/database';
import { difference, keyBy, map } from 'lodash-es';
import type { ReactNode } from 'react';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import Loading from '../../../src/components/loaders/loading';
import Page from '../../../src/components/page';
import Sortable from '../../../src/components/sortable';
import firebaseClientApp from '../../../src/firebase/client';
import { useData } from '../../../src/layout/providers/data';
import { rarityColors } from '../../colors';
import Error from '../../error';
import type { EquipType } from '../../fleet/ship/equip/type';
import type { TierType } from '../type';

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
	const { params, equipData } = useData<TierType>();
	const equipIndex = useMemo( () => keyBy( equipData, 'id' ), [] );
	
	const tierRef = ref( db, `tiers/${params.type}` );
	const [ data, loading, error ] = useObjectVal<Record<string, string[]>>( tierRef );
	
	const [ changed, setChanged ] = useState( false );
	const [ unTiered, setUnTiered ] = useState( [] );
	const tier0 = useState<EquipType[]>( [] );
	const tier1 = useState<EquipType[]>( [] );
	const tier2 = useState<EquipType[]>( [] );
	const tier3 = useState<EquipType[]>( [] );
	const tier4 = useState<EquipType[]>( [] );
	const tierN = useState<EquipType[]>( [] );
	
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
	
	useEffect( () => () => {
		if ( !changed ) return;
		set( tierRef, {
			0: map( tier0[ 0 ], 'id' ),
			1: map( tier1[ 0 ], 'id' ),
			2: map( tier2[ 0 ], 'id' ),
			3: map( tier3[ 0 ], 'id' ),
			4: map( tier4[ 0 ], 'id' ),
			N: map( tierN[ 0 ], 'id' )
		} ).then();
	}, [] );
	
	if ( loading ) return <Loading/>;
	if ( error ) return <Error error={error}/>;
	
	return (
		<Page
			title={params.type}
			titleProps={{
				actions: [ {
					name       : 'Save',
					onClick    : async () => {
						await set( tierRef, {
							0: map( tier0[ 0 ], 'id' ),
							1: map( tier1[ 0 ], 'id' ),
							2: map( tier2[ 0 ], 'id' ),
							3: map( tier3[ 0 ], 'id' ),
							4: map( tier4[ 0 ], 'id' ),
							N: map( tierN[ 0 ], 'id' )
						} );
						setChanged( false );
					},
					buttonProps: { disabled: !changed }
				} ]
			}}>
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
							<Typography mb={2}>Tier {index === 5 ? 'N' : index}</Typography>
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
