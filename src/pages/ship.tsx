import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import ActionTitle from '../components/actionTitle';
import PageContainer from '../components/pageContainer';
import { ModalVariant } from '../components/pageModal';
import VirtualDisplay from '../components/virtualDisplay';
import { useMappedColorClasses } from '../data/colors';
import Filters from '../fragments/ship/filters';
import ShipModal from '../fragments/ship/shipModal';
import useShipTable from '../fragments/ship/useShipTable';
import { useModal } from '../lib/providers/modal';
import { ship_checkVersion } from '../lib/store/reducers/shipReducer';

export default function Ship() {
	const dispatch = useDispatch();
	const colorClasses = useMappedColorClasses();
	const { show } = useModal();
	
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
		<ActionTitle>Ship Tracker</ActionTitle>
		<Filters table={table}/>
		<VirtualDisplay
			{...table}
			onClick={( row ) => show( ShipModal, {
				variant: ModalVariant.bottom
			}, {
				ship         : row.original as any,
				equipBetter  : equipBetter.value[ row.id ],
				selectedEquip: table.state.filters.find( ( filter ) => filter.id === 'equip' )?.value
			} )}
			renderRow={( { row, onClick, rowProps } ) => <ListItem
				divider
				onClick={() => onClick?.( row )}
				ContainerProps={rowProps}>
				<ListItemText
					primary={<>
						{row.values.name}
						{' - Tier: '}{row.cells[ 4 ].render( 'Cell' )}
						{' - '}{row.cells[ 6 ].render( 'Cell' )}
						{' / '}{row.cells[ 5 ].render( 'Cell' )}
					</>}
					secondary={`${row.values.rarity} - ${row.values.faction} - ${row.values.type}`}
				/>
				{/*@ts-ignore*/}
				<ListItemSecondaryAction className={colorClasses[ row.cells[ 7 ].column.color?.( row.cells[ 7 ] ) ]}>
					{row.cells[ 7 ].render( 'Cell' )}
				</ListItemSecondaryAction>
			</ListItem>}
		/>
	</PageContainer>;
}
