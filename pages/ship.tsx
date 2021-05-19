import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'react-table';

import ActionTitle from '../components/actionTitle';
import usePageHeight from '../components/usePageHeight';
import VirtualDisplay from '../components/virtualDisplay';
import Filters from '../fragments/ship/filters';
import ShipDialog from '../fragments/ship/shipDialog';
import useShipTable from '../fragments/ship/useShipTable';
import { useMappedColorClasses } from '../lib/reference/colors';
import shipRef, { blankShip } from '../lib/reference/shipRef';
import { ship_checkVersion, ship_reset } from '../lib/store/reducers/shipReducer';

export default function Ship() {
	const dispatch = useDispatch();
	const height = usePageHeight();
	const colorClasses = useMappedColorClasses();
	
	const [ shipOpen, setShipOpen ]       = React.useState( false ),
	      [ selectedRow, setSelectedRow ] = React.useState<Row>( { original: blankShip } as unknown as Row );
	const [ equipBetter, setEquipBetter ] = React.useState<{
		filter,
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
			<VirtualDisplay
				{...table}
				onPress={( row ) => {
					setSelectedRow( row );
					setShipOpen( true );
				}}
				RenderListItem={( { row, onPress, props } ) => <ListItem
					divider
					onClick={() => onPress( row )}
					ContainerProps={props}>
					<ListItemText
						primary={<>
							{row.values.name}
							{' - Tier: '}{row.cells[ 4 ].render( 'Cell' )}
							{' - '}{row.cells[ 6 ].render( 'Cell' )}
							{' / '}{row.cells[ 5 ].render( 'Cell' )}
						</>}
						secondary={`${row.values.rarity} - ${row.values.nation} - ${row.values.type}`}
					/>
					{/*@ts-expect-error: optional*/}
					<ListItemSecondaryAction className={colorClasses[ row.cells[ 7 ].column.color?.( row.cells[ 7 ] ) ]}>
						{row.cells[ 7 ].render( 'Cell' )}
					</ListItemSecondaryAction>
				</ListItem>}
			/>
		</div>
		<ShipDialog
			table={table}
			open={shipOpen}
			onClose={() => setShipOpen( false )}
			onExit={() => setSelectedRow( { original: blankShip } as unknown as Row )}
			ship={selectedRow.original as typeof shipRef[string]}
			equipBetter={equipBetter.value[ selectedRow.id ]}
		/>
	</div>;
}
