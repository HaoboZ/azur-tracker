import { ListItemSecondaryAction, ListItemText } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import PageContainer from '../components/page/container';
import PageTitle from '../components/page/title';
import { ModalVariant } from '../components/responsiveModal';
import VirtualDisplay from '../components/virtualDisplay';
import Filters from '../fragments/ship/filters';
import ShipModal from '../fragments/ship/shipModal';
import useShipTable from '../fragments/ship/useShipTable';
import { useModal } from '../lib/providers/modal';
import { ship_checkVersion } from '../lib/store/reducers/shipReducer';

export default function Ship() {
	const dispatch = useDispatch();
	const { showModal } = useModal();
	
	const [ equipBetter, setEquipBetter ] = React.useState<{
		filter,
		value: Record<string, [ number, number ][]>
	}>( { filter: undefined, value: {} } );
	
	const table = useShipTable( equipBetter, setEquipBetter );
	
	// resets ship equip tiers if version changes
	React.useEffect( () => {
		dispatch( ship_checkVersion() );
	}, [] );
	
	return <PageContainer>
		<PageTitle>Ship Tracker</PageTitle>
		<Filters table={table}/>
		<VirtualDisplay
			{...table}
			onClick={( row ) => showModal( ShipModal, {
				variant: ModalVariant.bottom
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
