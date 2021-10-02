import { ListItemSecondaryAction, ListItemText } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { useDispatch } from 'react-redux';

import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import VirtualDisplay from '../../components/virtualDisplay';
import { useModal } from '../../lib/providers/modal';
import { fleet_checkVersion } from '../../lib/store/reducers/fleetReducer';
import Filters from './filters';
import ShipModal from './shipModal';
import useFleetTable from './useFleetTable';

// noinspection JSUnusedGlobalSymbols
export default function Fleet() {
	const dispatch = useDispatch();
	const { showModal } = useModal();
	
	const [ equipBetter, setEquipBetter ] = React.useState<{
		filter,
		value: Record<string, [ number, number ][]>
	}>( { filter: undefined, value: {} } );
	
	const table = useFleetTable( equipBetter, setEquipBetter );
	
	// resets fleet equip tiers if version changes
	React.useEffect( () => {
		dispatch( fleet_checkVersion() );
	}, [] );
	
	return <PageContainer>
		<Head><title>Fleet | Azur Lane Tracker</title></Head>
		<PageTitle>Fleet Tracker</PageTitle>
		<Filters table={table}/>
		<VirtualDisplay
			{...table}
			onClick={( row ) => showModal( ShipModal, {
				variant: 'bottom'
			}, {
				ship         : row.original as any,
				equipBetter  : equipBetter.value[ row.id ],
				selectedEquip: table.state.filters.find( ( { id } ) => id === 'equip' )?.value
			} )}
			renderRow={( row ) => <>
				<ListItemText
					primary={<>
						{row.values.name}
						{' - Tier: '}{row.cells[ 4 ].render( 'Cell' )}
						{' - '}{row.cells[ 6 ].render( 'Cell' )}
						{' / '}{row.cells[ 5 ].render( 'Cell' )}
					</>}
					secondary={`${row.values.rarity} - ${row.values.faction} - ${row.values.type}`}
				/>
				<ListItemSecondaryAction className={( row.cells[ 7 ].column as any ).className?.( row.cells[ 7 ] )}>
					{row.cells[ 7 ].render( 'Cell' )}
				</ListItemSecondaryAction>
			</>}
		/>
	</PageContainer>;
}
