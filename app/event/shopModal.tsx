import DataDisplay, { useDataDisplay } from '@/components/dataDisplay';
import FormattedInput from '@/components/formattedInput';
import PageSection from '@/components/page/section';
import pget from '@/src/helpers/pget';
import { useModalControls } from '@/src/providers/modal';
import ModalWrapper from '@/src/providers/modal/dialog';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import {
	Button,
	DialogActions,
	DialogTitle,
	FormLabel,
	Grid,
	ListItemContent,
	ModalClose,
	ModalDialog,
	Typography,
} from '@mui/joy';
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
					<FormattedInput
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
			<Grid container spacing={1}>
				<Grid xs={8}>
					<ListItemContent>
						<Typography>{cells.name.getValue<string>()}</Typography>
						<Typography level='body-sm'>
							cost: {cells.cost.getValue<string>()} amount: {cells.amount.getValue<string>()}
						</Typography>
					</ListItemContent>
				</Grid>
				<Grid xs={4}>
					<FormLabel>Wanted</FormLabel>
					{render(cells.wanted)}
				</Grid>
			</Grid>
		),
	});

	return (
		<ModalWrapper>
			<ModalDialog minWidth='sm'>
				<DialogTitle>Shop Items</DialogTitle>
				<ModalClose />
				<PageSection
					title={`Expected / All: ${expectedCost} / ${buyoutCost}`}
					sx={{ overflowY: 'auto' }}>
					<DataDisplay table={table} />
				</PageSection>
				<DialogActions>
					<Button
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
					<Button variant='plain' color='neutral' onClick={closeModal}>
						Cancel
					</Button>
				</DialogActions>
			</ModalDialog>
		</ModalWrapper>
	);
}
