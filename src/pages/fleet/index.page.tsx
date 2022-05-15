import { ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import csvtojson from 'csvtojson';
import stringify from 'fast-json-stable-stringify';
import { crc32 } from 'hash-wasm';
import { cloneDeep, groupBy, keyBy, mapValues, pick, reduce, sortBy } from 'lodash-es';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import HelpTourButton from '../../components/helpTourButton';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import VirtualDisplay from '../../components/virtualDisplay';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import { useData } from '../../providers/data';
import { useModal } from '../../providers/modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fleet_setShips, fleet_setVersion } from '../../store/reducers/fleetReducer';
import FleetFilters from './filters';
import getTier from './getTier';
import { FleetType, Ship } from './type';
import useFleetTable from './useTable';

const ShipModal = dynamic( () => import( './ship/modal' ), { suspense: true } );

// noinspection JSUnusedGlobalSymbols
export default function Fleet() {
	const fleet = useAppSelector( ( { fleet } ) => fleet );
	const dispatch = useAppDispatch();
	const { showModal } = useModal();
	const { fleetData, equippableData, equipTierData } = useData<FleetType>();
	
	const [ data, setData ] = useState<Ship[]>( [] );
	
	const [ equipBetter, setEquipBetter ] = useState<{
		filter,
		value: Record<string, [ number, number ][]>
	}>( { filter: undefined, value: {} } );
	
	const table = useFleetTable( data, equipBetter, setEquipBetter );
	
	// resets fleet equip tiers if version changes
	useAsyncEffect( async () => {
		const checksum = await crc32( stringify( equipTierData ) );
		if ( fleet.version === checksum ) return;
		const ships = cloneDeep( fleet.ships );
		for ( const name in ships ) {
			const { equip } = ships[ name ];
			if ( name in fleetData )
				getTier( equippableData, equipTierData, fleetData[ name ], equip );
			else
				delete ships[ name ];
		}
		dispatch( fleet_setShips( ships ) );
		dispatch( fleet_setVersion( checksum ) );
	}, [] );
	
	// set ship data
	useEffect( () => {
		setData( Object.values( fleetData ).map( ( shipData ) => {
			const _ship = fleet.ships[ shipData.id ];
			
			return {
				...shipData,
				love : _ship?.love || 0,
				lvl  : _ship?.lvl || 0,
				equip: _ship?.equip || new Array( 5 ).fill( [] )
			};
		} ).filter( ( shipData ) => {
			if ( !fleet.filter.levelMax && shipData.lvl === 126 ) return false;
			if ( !fleet.filter.level0 && !shipData.lvl ) return false;
			return fleet.filter.equipMax || !shipData.equip?.every( ( equip ) => equip[ 2 ] === 1 );
		} ) );
	}, [ fleet ] );
	
	return (
		<PageContainer>
			<Head><title>Fleet | Azur Lane Tracker</title></Head>
			<PageTitle actions={(
				<HelpTourButton
					steps={[ {
						element: '#help',
						intro  : (
							<Fragment>
								<Typography>This page will help you</Typography>
								<ul style={{ textAlign: 'start' }}>
									<li>track ship information (levels, affection)</li>
									<li>sort your fleet easily</li>
									<li>and have decent equips by tier</li>
								</ul>
								<Typography>
									For people who want every ship to equip good stuff and level up everyone
								</Typography>
							</Fragment>
						)
					}, {
						element: '#farmOil',
						intro  : (
							<Typography>
								Calculates amount of oil needed.
							</Typography>
						)
					} ]}
				/>
			)}>
				Fleet Tracker
			</PageTitle>
			<FleetFilters table={table}/>
			<VirtualDisplay
				{...table}
				renderRow={( row ) => (
					<Fragment>
						<ListItemText
							primary={(
								<Fragment>
									{row.values.name}
									{' - Tier: '}{row.cells[ 4 ].render( 'Cell' )}
									{' - '}{row.cells[ 6 ].render( 'Cell' )}
									{' / '}{row.cells[ 5 ].render( 'Cell' )}
								</Fragment>
							)}
							secondary={`${row.values.rarity} - ${row.values.faction} - ${row.values.type}`}
						/>
						<ListItemSecondaryAction className={( row.cells[ 7 ].column as any ).className?.( row.cells[ 7 ] )}>
							{row.cells[ 7 ].render( 'Cell' ) as ReactNode}
						</ListItemSecondaryAction>
					</Fragment>
				)}
				onClick={( row ) => showModal( ShipModal, {
					variant: 'drawer',
					bottom : true,
					props  : {
						ship         : row.original,
						equipBetter  : equipBetter.value[ row.id ],
						selectedEquip: table.state.filters.find( ( { id } ) => id === 'equip' )?.value
					}
				} )}
			/>
		</PageContainer>
	);
}

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async () => {
	const { data: fleetCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Fleet&tqx=out:csv` );
	const { data: equipCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Equip&tqx=out:csv` );
	const { data: equipabbleCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Equippable&tqx=out:csv` );
	const { data: equipTierCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Tier&tqx=out:csv` );
	
	return {
		revalidate: 6 * 60 * 60,
		props     : {
			fleetData     : keyBy( sortBy( await csvtojson().fromString( fleetCSV ), ( { num } ) => +num )
				.map( ( val ) => ( {
					...pick( val, [ 'id', 'name', 'rarity', 'faction', 'type' ] ),
					tier     : +val.tier,
					special  : JSON.parse( val.special ),
					equipType: [ val.equip1, val.equip2, val.equip3, val.equip4, val.equip5 ]
				} ) ), 'id' ),
			equipData     : sortBy( await csvtojson().fromString( equipCSV ), [ 'type', ( { id } ) => +id ] )
				.map( ( { id, ...val } ) => ( { id: +id, ...val } ) ),
			equippableData: keyBy( ( await csvtojson().fromString( equipabbleCSV ) ).map( ( value ) => ( {
				...pick( value, [ 'type', 'tier' ] ),
				equip: [ value.equip1, value.equip2, value.equip3 ].filter( Boolean )
			} ) ), 'type' ),
			equipTierData : mapValues( groupBy( await csvtojson().fromString( equipTierCSV ), 'type' ),
				( value ) => reduce( value, ( obj, value ) => {
					let i = 0;
					for ( const id of [ value.id0, value.id1, value.id2, value.id3, value.id4 ] ) {
						if ( id ) {
							obj[ id ] = [ +value.tier, i++ ];
						}
					}
					return obj;
				}, {} ) )
		}
	};
};
