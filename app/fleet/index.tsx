'use client';
import HelpTourButton from '@/components/helpTourButton';
import Page from '@/components/page';
import VirtualDisplay from '@/components/virtualDisplay';
import { useAuth } from '@/src/providers/auth';
import { useData } from '@/src/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fleet_setShips, fleet_setVersion } from '@/src/store/reducers/fleetReducer';
import { Typography } from '@mui/material';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import FleetFilters from './filters';
import getTier from './getTier';
import type { FleetType, Ship } from './type';
import useFleetTable from './useTable';

// noinspection JSUnusedGlobalSymbols
export default function Fleet() {
	const user = useAuth();
	const fleet = useAppSelector( ( { fleet } ) => fleet );
	const dispatch = useAppDispatch();
	const { fleetData, equippableData, equipTierData, equipTierHash } = useData<FleetType>();
	
	const [ data, setData ] = useState<Ship[]>( [] );
	
	const table = useFleetTable( data );
	
	// resets fleet equip tiers if version changes
	useEffect( () => {
		if ( fleet.version === equipTierHash ) return;
		if ( fleet.version && !confirm( 'Load new tiering information?' ) ) return;
		const ships = cloneDeep( fleet.ships );
		for ( const name in ships ) {
			const { equip } = ships[ name ];
			if ( name in fleetData )
				getTier( equippableData, equipTierData, fleetData[ name ], equip );
			else
				delete ships[ name ];
		}
		dispatch( fleet_setShips( ships ) );
		dispatch( fleet_setVersion( equipTierHash ) );
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
		<Page
			hideBack
			title='Fleet Tracker'
			titleProps={{
				actions: user?.uid === process.env.NEXT_PUBLIC_ADMIN_ID ? [ {
					name   : 'Revalidate',
					onClick: () => axios.get( 'api/revalidate/fleet' )
				} ] : (
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
				)
			}}>
			<FleetFilters table={table}/>
			<VirtualDisplay table={table}/>
		</Page>
	);
}
