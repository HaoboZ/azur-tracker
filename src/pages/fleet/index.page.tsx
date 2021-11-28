import { ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HelpTourButton from '../../components/helpTourButton';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import VirtualDisplay from '../../components/virtualDisplay';
import { useModal } from '../../lib/providers/modal';
import { fleet_setShips, fleet_setVersion, version } from '../../lib/store/reducers/fleetReducer';
import fleetData from './data';
import FleetFilters from './filters';
import getTier from './getTier';
import useFleetTable from './useTable';

const ShipModal = dynamic( () => import( './ship/modal' ) );

// noinspection JSUnusedGlobalSymbols
export default function Fleet() {
	const fleet = useSelector( ( { fleet } ) => fleet );
	const dispatch = useDispatch();
	const { showModal } = useModal();
	
	const [ equipBetter, setEquipBetter ] = useState<{
		filter,
		value: Record<string, [ number, number ][]>
	}>( { filter: undefined, value: {} } );
	
	const table = useFleetTable( equipBetter, setEquipBetter );
	
	// resets fleet equip tiers if version changes
	useEffect( () => {
		if ( fleet.version !== version ) {
			// recalculate equipment tiers
			const ships = cloneDeep( fleet.ships );
			for ( const name in ships ) {
				const { equip } = ships[ name ];
				getTier( fleetData[ name ], equip );
			}
			dispatch( fleet_setShips( ships ) );
			dispatch( fleet_setVersion() );
		}
	}, [] );
	
	return <PageContainer>
		<Head><title>Fleet | Azur Lane Tracker</title></Head>
		<PageTitle actions={ <HelpTourButton
			steps={ [ {
				target : '#help',
				content: <>
					<Typography>This page will help you</Typography>
					<ul style={ { textAlign: 'start' } }>
						<li>track ship information (levels, affection)</li>
						<li>sort your fleet easily</li>
						<li>and have decent equips by tier</li>
					</ul>
					<Typography>For people who want every ship to equip good stuff and level up everyone</Typography>
				</>,
				placement: 'center'
			}/*, {
				target : '#farmOil',
				content: <Typography>
					Calculates amount of oil needed.
				</Typography>
			}*/ ] }
		/> }>Fleet Tracker</PageTitle>
		<FleetFilters table={ table }/>
		<VirtualDisplay
			{ ...table }
			renderRow={ ( row ) => <>
				<ListItemText
					primary={ <>
						{ row.values.name }
						{ ' - Tier: ' }{ row.cells[ 4 ].render( 'Cell' ) }
						{ ' - ' }{ row.cells[ 6 ].render( 'Cell' ) }
						{ ' / ' }{ row.cells[ 5 ].render( 'Cell' ) }
					</> }
					secondary={ `${row.values.rarity} - ${row.values.faction} - ${row.values.type}` }
				/>
				<ListItemSecondaryAction className={ ( row.cells[ 7 ].column as any ).className?.( row.cells[ 7 ] ) }>
					{ row.cells[ 7 ].render( 'Cell' ) }
				</ListItemSecondaryAction>
			</> }
			onClick={ ( row ) => showModal( ShipModal, {
				variant: 'bottom'
			}, {
				ship         : row.original,
				equipBetter  : equipBetter.value[ row.id ],
				selectedEquip: table.state.filters.find( ( { id } ) => id === 'equip' )?.value
			} ) }
		/>
	</PageContainer>;
}
