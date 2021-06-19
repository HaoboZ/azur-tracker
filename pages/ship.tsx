import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'react-table';

import PageContainer from '../components/pageContainer';
import VirtualDisplay from '../components/virtualDisplay';
import Filters from '../fragments/ship/filters';
import ShipDialog from '../fragments/ship/shipDialog';
import useShipTable from '../fragments/ship/useShipTable';
import { useMappedColorClasses } from '../lib/reference/colors';
import shipRef, { blankShip } from '../lib/reference/shipRef';
import { ship_checkVersion } from '../lib/store/reducers/shipReducer';

export default function Ship() {
	const dispatch = useDispatch();
	const colorClasses = useMappedColorClasses();
	
	const [ shipOpen, setShipOpen ]       = React.useState( false ),
	      [ selectedRow, setSelectedRow ] = React.useState<Row>( { original: blankShip } as any );
	const [ equipBetter, setEquipBetter ] = React.useState<{
		filter,
		value: Record<string, number[]>
	}>( { filter: undefined, value: {} } );
	
	const table = useShipTable( equipBetter, setEquipBetter );
	
	React.useEffect( () => {
		dispatch( ship_checkVersion() );
	}, [] );
	
	// noinspection CssUnusedSymbol
	return <PageContainer title='Ship Tracker'>
		{ /*language=css*/}
		<style global jsx>{`
			.MuiTableCell-sizeSmall {
				padding: 6px 8px !important;
				white-space: nowrap;
				overflow: hidden;
			}
			
			.MuiTableRow-hover:hover {
				cursor: pointer;
			}
		`}</style>
		<Filters table={table} resetEquip={() => setEquipBetter( { filter: undefined, value: {} } )}/>
		<VirtualDisplay
			{...table}
			onClick={( row ) => {
				setSelectedRow( row );
				setShipOpen( true );
			}}
			RenderRow={( { row, onClick, rowProps } ) => <ListItem
				divider
				onClick={() => onClick( row )}
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
				{/*@ts-expect-error: optional*/}
				<ListItemSecondaryAction className={colorClasses[ row.cells[ 7 ].column.color?.( row.cells[ 7 ] ) ]}>
					{row.cells[ 7 ].render( 'Cell' )}
				</ListItemSecondaryAction>
			</ListItem>}
		/>
		<ShipDialog
			table={table}
			open={shipOpen}
			onClose={() => setShipOpen( false )}
			onExit={() => setSelectedRow( { original: blankShip } as any )}
			ship={selectedRow.original as typeof shipRef[string]}
			equipBetter={equipBetter.value[ selectedRow.id ]}
		/>
	</PageContainer>;
}
