import { Box, Grid, ListItemText, Typography } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { keyBy, mapValues } from 'lodash-es';
import { useMemo, useState } from 'react';
import DataDisplay, { useDataDisplay } from '../../src/components/dataDisplay';
import FormattedTextField from '../../src/components/formattedTextField';
import { ResponsiveModalContainer } from '../../src/layout/providers/modal/responsiveModal';
import { useAppDispatch, useAppSelector } from '../../src/store/hooks';
import { event_setShop } from '../../src/store/reducers/eventReducer';
import type { EventType } from './type';

const columnHelper = createColumnHelper<{ name: string, amount: number, cost: number, wanted: number }>();

export default function ShopModal( { eventShopData }: Pick<EventType, 'eventShopData'> ) {
	const _shop = useAppSelector( ( { event } ) => event.shop );
	const dispatch = useAppDispatch();
	
	const [ shop, setShop ] = useState( () => eventShopData.map( ( data ) => ( {
		...data,
		wanted: _shop[ data.name ]
	} ) ) );
	
	// expected cost to buy wanted items and total cost to buy everything
	const [ expectedCost, buyoutCost ] = useMemo(
		() => shop.reduce( ( total, item ) => [
			total[ 0 ] + item.cost * Math.min( item.amount, item.wanted || 0 ),
			total[ 1 ] + item.cost * item.amount
		], [ 0, 0 ] ),
		[ shop ] );
	
	const columns = useMemo( () => [
		columnHelper.accessor( 'name', { header: 'Name' } ),
		columnHelper.accessor( 'cost', { header: 'Cost' } ),
		columnHelper.accessor( 'amount', { header: 'Amount' } ),
		columnHelper.accessor( 'wanted', {
			header: 'Wanted',
			cell  : ( { getValue, row } ) => (
				<FormattedTextField
					key='name'
					type='number'
					placeholder='0'
					value={getValue() || 0}
					onChange={( { target } ) => {
						shop[ row.index ].wanted = Math.min( Math.max( parseInt( target.value ) || 0, 0 ), row.original.amount );
						setShop( [ ...shop ] );
					}}
				/>
			)
		} )
	], [] );
	
	const table = useDataDisplay( {
		data         : shop,
		columns,
		enableSorting: false,
		renderRow    : ( { cells, render } ) => (
			<Grid container spacing={2}>
				<Grid item xs={8} display='flex' alignItems='center'>
					<ListItemText
						primary={cells.name.getValue<string>()}
						secondary={`cost: ${cells.cost.getValue()} amount: ${cells.amount.getValue()}`}
					/>
				</Grid>
				<Grid item xs={4}>
					Wanted
					{render( cells.wanted )}
				</Grid>
			</Grid>
		)
	} );
	
	return (
		<ResponsiveModalContainer
			title='Shop Items'
			sx={{ p: 0 }}
			onSave={() => dispatch( event_setShop( {
				shop : mapValues( keyBy( shop, 'name' ), 'wanted' ),
				total: expectedCost
			} ) )}>
			<Box mx={2} mt={2}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography>Buyout Price: {buyoutCost}</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography>Expected Price: {expectedCost}</Typography>
					</Grid>
				</Grid>
			</Box>
			<DataDisplay table={table}/>
		</ResponsiveModalContainer>
	);
}
