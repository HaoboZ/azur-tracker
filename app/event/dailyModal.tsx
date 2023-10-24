import ActionTitle from '@/components/actionTitle';
import DataDisplay, { useDataDisplay } from '@/components/dataDisplay';
import { deleteColumn, deleteIcon } from '@/components/dataDisplay/extras/delete';
import { sortIcon } from '@/components/dataDisplay/extras/sort';
import FormattedTextField from '@/components/formattedTextField';
import ModalDialog from '@/src/providers/modal/dialog';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { Grid, ListItemSecondaryAction } from '@mui/material';
import type { Row } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import { nanoid } from 'nanoid';
import { clone } from 'rambdax';
import { Fragment, useMemo, useState } from 'react';

type Daily = { id: string; name: string; amount: number };
const columnHelper = createColumnHelper<Daily>();

export default function DailyModal() {
	const _daily = useAppSelector(({ event }) => event.daily);
	const dispatch = useAppDispatch();

	const [daily, setDaily] = useState(() => clone(_daily));

	// total points gained daily
	const dailyTotal = useMemo(
		() => daily.reduce((total, item) => total + +item.amount, 0),
		[daily],
	);

	function modifyItem(row: Row<Daily>, item: Partial<Daily>) {
		if ('amount' in item) {
			item.amount = Math.max(item.amount || 0, 0);
		}
		setDaily((daily) => {
			const index = daily.findIndex(({ id }) => id === row.id);
			if (index !== -1) daily[index] = { ...daily[index], ...item };
			return [...daily];
		});
	}

	const columns = useMemo(
		() => [
			// columnHelper.display( sortColumn() ),
			columnHelper.accessor('name', {
				header: 'Name',
				cell: ({ getValue, row }) => (
					<FormattedTextField
						key='name'
						fullWidth
						type='text'
						value={getValue()}
						onChange={({ target }) => modifyItem(row, { name: target.value })}
					/>
				),
			}),
			columnHelper.accessor('amount', {
				header: 'Amount',
				cell: ({ getValue, row }) => (
					<FormattedTextField
						key='amount'
						type='number'
						placeholder='0'
						value={getValue()}
						onChange={({ target }) => modifyItem(row, { amount: parseInt(target.value) })}
					/>
				),
			}),
			columnHelper.display(deleteColumn()),
		],
		[],
	);

	const table = useDataDisplay({
		data: daily,
		setData: setDaily,
		columns,
		getRowId: ({ id }) => id,
		enableSorting: false,
		renderRow: ({ cells, render, row, table, handleProps }) => (
			<Fragment>
				{sortIcon(handleProps)}
				<Grid container spacing={2}>
					<Grid item xs={6}>
						{render(cells.name)}
					</Grid>
					<Grid item xs={4}>
						{render(cells.amount)}
					</Grid>
				</Grid>
				<ListItemSecondaryAction>{deleteIcon(row, table)}</ListItemSecondaryAction>
			</Fragment>
		),
	});

	return (
		<ModalDialog
			title='Daily Points'
			onSave={() => dispatch(eventActions.setDaily({ daily, total: dailyTotal }))}>
			<ActionTitle
				variant='h6'
				actions={[
					{
						name: 'Add',
						onClick: () => setDaily([...daily, { id: nanoid(), name: '', amount: 0 }]),
						buttonProps: { color: 'primary' },
					},
				]}>
				Total Daily: {dailyTotal}
			</ActionTitle>
			<DataDisplay table={table} />
		</ModalDialog>
	);
}
