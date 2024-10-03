import DataDisplay, { useDataDisplay } from '@/components/dataDisplay';
import FormattedTextField from '@/components/formattedTextField';
import PageSection from '@/components/page/section';
import pget from '@/src/helpers/pget';
import { useModalControls } from '@/src/providers/modal';
import DialogWrapper from '@/src/providers/modal/dialog';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid2,
	ListItemText,
	Typography,
} from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { indexBy, mapValues } from 'remeda';
import type { EventType } from './type';

const columnHelper = createColumnHelper<{
	name: string;
	amount: number;
	cost: number;
	wanted: number;
}>();

export default function ShopModal({ eventShopData }: Pick<EventType, 'eventShopData'>) {
	const _shop = useAppSelector(pget('event.shop'));
	const dispatch = useAppDispatch();
	const { closeModal } = useModalControls();

	const [shop, setShop] = useState(() =>
		eventShopData.map((data) => ({ ...data, wanted: _shop[data.name] })),
	);

	// expected cost to buy wanted items and total cost to buy everything
	const [expectedCost, buyoutCost] = useMemo(
		() =>
			shop.reduce(
				(total, item) => [
					total[0] + item.cost * Math.min(item.amount, item.wanted || 0),
					total[1] + item.cost * item.amount,
				],
				[0, 0],
			),
		[shop],
	);

	const columns = useMemo(
		() => [
			columnHelper.accessor('name', { header: 'Name', size: 30 }),
			columnHelper.accessor('cost', { header: 'Cost' }),
			columnHelper.accessor('amount', { header: 'Amount' }),
			columnHelper.accessor('wanted', {
				header: 'Wanted',
				cell: ({ getValue, row }) => (
					<FormattedTextField
						key='name'
						type='number'
						placeholder='0'
						value={getValue() || 0}
						onChange={({ target }) => {
							setShop((shop) => {
								const index = shop.findIndex(({ name }) => name === row.id);
								if (index !== -1)
									shop[index].wanted = Math.min(
										Math.max(parseInt(target.value) || 0, 0),
										row.original.amount,
									);
								return [...shop];
							});
						}}
					/>
				),
			}),
		],
		[],
	);

	const table = useDataDisplay({
		data: shop,
		columns,
		getRowId: pget('name'),
		enableSorting: false,
		renderRow: ({ cells, render }) => (
			<Grid2 container spacing={1}>
				<Grid2 size={8}>
					<ListItemText
						secondary={`cost: ${cells.cost.getValue<string>()} amount: ${cells.amount.getValue<string>()}`}>
						{cells.name.getValue<string>()}
					</ListItemText>
				</Grid2>
				<Grid2 size={4}>
					<Typography variant='subtitle2'>Wanted</Typography>
					{render(cells.wanted)}
				</Grid2>
			</Grid2>
		),
	});

	return (
		<DialogWrapper>
			<DialogTitle>Shop Items</DialogTitle>
			<DialogContent>
				<PageSection
					title={`Expected / All: ${expectedCost} / ${buyoutCost}`}
					titleProps={{ variant: 'body1' }}>
					<DataDisplay table={table} />
				</PageSection>
			</DialogContent>
			<DialogActions>
				<Button
					variant='contained'
					onClick={() => {
						dispatch(
							eventActions.setShop({
								shop: mapValues(indexBy(shop, pget('name')), pget('wanted')),
								total: expectedCost,
							}),
						);
						closeModal();
					}}>
					Save
				</Button>
				<Button color='error' onClick={closeModal}>
					Cancel
				</Button>
			</DialogActions>
		</DialogWrapper>
	);
}
