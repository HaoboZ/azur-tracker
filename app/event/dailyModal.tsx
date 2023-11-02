import DataDisplay, { useDataDisplay } from '@/components/dataDisplay';
import { deleteColumn, deleteIcon } from '@/components/dataDisplay/extras/delete';
import { sortColumn, sortIcon } from '@/components/dataDisplay/extras/sort';
import FormattedInput from '@/components/formattedInput';
import PageSection from '@/components/page/section';
import pget from '@/src/helpers/pget';
import { useModalControls } from '@/src/providers/modal';
import ModalWrapper from '@/src/providers/modal/dialog';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { Button, DialogActions, DialogTitle, Grid, ModalClose, ModalDialog } from '@mui/joy';
import type { Row } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import { nanoid } from 'nanoid';
import { Fragment, useMemo, useState } from 'react';

type Daily = { id: string; name: string; amount: number };
const columnHelper = createColumnHelper<Daily>();

export default function DailyModal() {
	const _daily = useAppSelector(pget('event.daily'));
	const dispatch = useAppDispatch();
	const { closeModal } = useModalControls();

	const [daily, setDaily] = useState(() => structuredClone(_daily));

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
			columnHelper.display(sortColumn()),
			columnHelper.accessor('name', {
				header: 'Name',
				cell: ({ getValue, row }) => (
					<FormattedInput
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
					<FormattedInput
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
		getRowId: pget('id'),
		enableSorting: false,
		onRowClick: () => null,
		renderRow: ({ cells, render, row, table, handleProps }) => (
			<Fragment>
				{sortIcon(handleProps)}
				<Grid container spacing={1}>
					<Grid xs={7}>{render(cells.name)}</Grid>
					<Grid xs={5}>{render(cells.amount)}</Grid>
				</Grid>
				{deleteIcon(row, table)}
			</Fragment>
		),
	});

	return (
		<ModalWrapper>
			<ModalDialog minWidth='sm'>
				<DialogTitle>Daily Points</DialogTitle>
				<ModalClose />
				<PageSection
					title={`Total Daily: ${dailyTotal}`}
					actions={[
						{
							name: 'Add',
							onClick: () => setDaily([...daily, { id: nanoid(), name: '', amount: 0 }]),
							buttonProps: { color: 'primary' },
						},
					]}
					sx={{ overflowY: 'auto' }}>
					<DataDisplay table={table} />
				</PageSection>
				<DialogActions>
					<Button
						onClick={() => {
							dispatch(eventActions.setDaily({ daily, total: dailyTotal }));
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
