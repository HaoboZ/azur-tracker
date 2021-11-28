import { Box, Grid, ListItemText, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnhancedDisplay from '../../components/enhancedDisplay';
import FormattedTextField from '../../components/formattedTextField';
import { ResponsiveModalContainer } from '../../components/responsiveModal';
import { event_setShop } from '../../lib/store/reducers/eventReducer';
import eventData from './data';

export default function ShopModal() {
	const _shop = useSelector( ( { event } ) => event.shop );
	const dispatch = useDispatch();
	
	const [ shop, setShop ] = useState( _shop );
	
	// expected cost to buy wanted items and total cost to buy everything
	const [ expectedCost, buyoutCost ] = useMemo(
		() => eventData.shop.reduce( ( total, item ) => [
			total[ 0 ] + item.cost * Math.min( item.amount, shop[ item.name ] || 0 ),
			total[ 1 ] + item.cost * item.amount
		], [ 0, 0 ] ),
		[ shop ] );
	
	return (
		<ResponsiveModalContainer
			title='Shop Items'
			sx={ { p: 0 } }
			onSave={ () => dispatch( event_setShop( { shop, total: expectedCost } ) ) }>
			<Box mx={ 2 } mt={ 2 }>
				<Grid container spacing={ 2 }>
					<Grid item xs={ 6 }>
						<Typography>Buyout Price: { buyoutCost }</Typography>
					</Grid>
					<Grid item xs={ 6 }>
						<Typography>Expected Price: { expectedCost }</Typography>
					</Grid>
				</Grid>
			</Box>
			<EnhancedDisplay
				items={ eventData.shop }
				extraData={ shop }
				tableProps={ {
					headers: [
						'Name',
						'Cost',
						'Amount',
						'Wanted'
					],
					columns: ( item ) => [
						item.name,
						item.cost,
						item.amount,
						<FormattedTextField
							key='name'
							type='number'
							placeholder='0'
							value={ shop[ item.name ] || 0 }
							onChange={ ( { target } ) => setShop( {
								...shop,
								[ item.name ]: Math.min( Math.max( parseInt( target.value ) || 0, 0 ), item.amount )
							} ) }
						/>
					]
				} }
				listProps={ {
					renderRow: ( item ) => (
						<Grid container spacing={ 2 }>
							<Grid item xs={ 9 }>
								<ListItemText
									primary={ item.name }
									secondary={ `cost: ${ item.cost } amount: ${ item.amount }` }
								/>
							</Grid>
							<Grid item xs={ 3 }>
								<FormattedTextField
									type='number'
									label='Wanted'
									placeholder='0'
									value={ shop[ item.name ] }
									onChange={ ( { target } ) => setShop( {
										...shop,
										[ item.name ]: Math.min( Math.max( parseInt( target.value ) || 0, 0 ), item.amount )
									} ) }
								/>
							</Grid>
						</Grid>
					)
				} }
			/>
		</ResponsiveModalContainer>
	);
}
