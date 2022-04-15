import { ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { cloneDeep, keyBy, pick } from 'lodash-es';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HelpTourButton from '../../components/helpTourButton';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import VirtualDisplay from '../../components/virtualDisplay';
import { useData } from '../../providers/data';
import { useModal } from '../../providers/modal';
import { fleet_setShips, fleet_setVersion, version } from '../../store/reducers/fleetReducer';
import FleetFilters from './filters';
import getTier from './getTier';
import { FleetType, Ship } from './type';
import useFleetTable from './useTable';

const ShipModal = dynamic( () => import( './ship/modal' ), { suspense: true } );

// noinspection JSUnusedGlobalSymbols
export default function Fleet() {
	const fleet = useSelector( ( { fleet } ) => fleet );
	const dispatch = useDispatch();
	const { showModal } = useModal();
	const { fleetData } = useData<FleetType>();
	
	const [ data, setData ] = useState<Ship[]>( [] );
	
	const [ equipBetter, setEquipBetter ] = useState<{
		filter,
		value: Record<string, [ number, number ][]>
	}>( { filter: undefined, value: {} } );
	
	const table = useFleetTable( data, equipBetter, setEquipBetter );
	
	// resets fleet equip tiers if version changes
	useEffect( () => {
		if ( fleet.version !== version ) {
			// recalculate equipment tiers
			const ships = cloneDeep( fleet.ships );
			for ( const name in ships ) {
				const { equip } = ships[ name ];
				if ( name in fleetData )
					getTier( fleetData[ name ], equip );
				else
					delete ships[ name ];
			}
			dispatch( fleet_setShips( ships ) );
			dispatch( fleet_setVersion() );
		}
	}, [] );
	
	// set ship data
	useEffect( () => {
		setData( Object.values( fleetData )
			.map( ( shipData ) => {
				const _ship = fleet.ships[ shipData.id ];
				
				return {
					...shipData,
					love : _ship?.love || 0,
					lvl  : _ship?.lvl || 0,
					equip: _ship?.equip || new Array( 5 ).fill( [] )
				};
			} )
			.filter( ( shipData ) => {
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
						target   : '#help',
						content  : (
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
						),
						placement: 'center'
					}, {
						target : '#farmOil',
						content: (
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
							{row.cells[ 7 ].render( 'Cell' )}
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
	const { data: fleetData } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Fleet&tqx=out:csv` );
	
	return {
		revalidate: 6 * 60 * 60,
		props     : {
			fleetData: keyBy( ( await csvtojson().fromString( fleetData ) ).map( ( val ) => ( {
				...pick( val, [ 'id', 'name', 'rarity', 'faction', 'type' ] ),
				tier     : +val.tier,
				special  : JSON.parse( val.special ),
				equipType: [ val.equip1, val.equip2, val.equip3, val.equip4, val.equip5 ]
			} ) ), 'id' )
		}
	};
};
