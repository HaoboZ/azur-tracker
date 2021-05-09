import React from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'react-table';

import ActionTitle from '../components/actionTitle';
import usePageHeight from '../components/usePageHeight';
import VirtualTable from '../components/virtualTable';
import Filters from '../fragments/ship/filters';
import ShipDialog from '../fragments/ship/shipDialog';
import useShipTable from '../fragments/ship/useShipTable';
import shipRef from '../lib/reference/shipRef';
import { ship_checkVersion, ship_reset } from '../lib/store/reducers/shipReducer';

export default function Ship() {
	const dispatch = useDispatch();
	const height = usePageHeight();
	
	const [ shipOpen, setShipOpen ]       = React.useState( false ),
	      [ selectedRow, setSelectedRow ] = React.useState<Row>( { original: shipRef[ 'Universal_Bulin' ] } as any );
	const [ equipBetter, setEquipBetter ] = React.useState<{
		filter
		value: Record<string, number[]>
	}>( { filter: undefined, value: {} } );
	
	const table = useShipTable( equipBetter, setEquipBetter );
	
	React.useEffect( () => {
		dispatch( ship_checkVersion() );
	}, [] );
	
	// noinspection CssUnusedSymbol
	return <div style={{ height, display: 'flex', flexFlow: 'column' }}>
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
		<ActionTitle
			title='Ship Tracker'
			actions={[ {
				name   : 'Reset',
				onClick: () => {
					if ( confirm( 'Are you sure you want to reset this page?' ) )
						dispatch( ship_reset() );
				}
			} ]}
		/>
		<Filters table={table} resetEquip={() => setEquipBetter( { filter: undefined, value: {} } )}/>
		<div style={{ height: '100%' }}>
			<VirtualTable {...table} onPress={( row ) => {
				setSelectedRow( row );
				setShipOpen( true );
			}}/>
		</div>
		<ShipDialog
			table={table}
			open={shipOpen}
			onClose={() => setShipOpen( false )}
			ship={selectedRow.original as any}
			equipBetter={equipBetter.value[ selectedRow.id ]}
		/>
	</div>;
}
