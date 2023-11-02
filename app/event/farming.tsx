import DataDisplay, { useDataDisplay } from '@/components/dataDisplay';
import { deleteColumn, deleteIcon } from '@/components/dataDisplay/extras/delete';
import { sortColumn, sortIcon } from '@/components/dataDisplay/extras/sort';
import FormattedInput from '@/components/formattedInput';
import PageSection from '@/components/page/section';
import pget from '@/src/helpers/pget';
import { useData } from '@/src/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { Autocomplete, FormLabel, Grid, Typography } from '@mui/joy';
import { createColumnHelper } from '@tanstack/react-table';
import { nanoid } from 'nanoid';
import { Fragment, useMemo } from 'react';
import type { EventType } from './type';

const columnHelper = createColumnHelper<{
	id: string;
	points: number;
	oil: number;
	plays: number;
	cost: number;
}>();

export default function EventFarming({ remainingPoints }: { remainingPoints: number }) {
	const farming = useAppSelector(pget('event.farming'));
	const dispatch = useAppDispatch();
	const { eventStagesData } = useData<EventType>();

	const farmingData = useMemo(
		() =>
			farming.map((row) => {
				const plays = Math.ceil(remainingPoints ? remainingPoints / row.points : 0),
					cost = plays * row.oil;
				return { ...row, plays, cost: isFinite(cost) ? cost : Infinity };
			}),
		[farming, remainingPoints],
	);

	const columns = useMemo(
		() => [
			columnHelper.display(sortColumn()),
			columnHelper.accessor('points', {
				header: 'Points/Run',
				cell: ({ getValue, row }) => (
					<Autocomplete
						freeSolo
						autoSelect
						disableClearable
						multiple={false}
						value={getValue().toString()}
						options={Object.keys(eventStagesData).reverse()}
						getOptionLabel={(option) => eventStagesData[option] ?? option}
						inputMode='numeric'
						onChange={(_, value) => {
							dispatch(
								eventActions.modifyFarming({
									id: row.original.id,
									points: parseInt(value),
								}),
							);
						}}
					/>
				),
			}),
			columnHelper.accessor('oil', {
				header: 'Oil Cost/Run',
				cell: ({ getValue, row }) => (
					<FormattedInput
						type='number'
						inputMode='numeric'
						value={getValue()}
						onChange={({ target }) => {
							dispatch(
								eventActions.modifyFarming({
									id: row.original.id,
									oil: parseInt(target.value),
								}),
							);
						}}
					/>
				),
			}),
			columnHelper.accessor('plays', { header: 'Required Plays' }),
			columnHelper.accessor('cost', { header: 'Total Oil Cost' }),
			columnHelper.display(deleteColumn(3)),
		],
		[],
	);

	const table = useDataDisplay({
		data: farmingData,
		setData: (data) => dispatch(eventActions.setFarming(data)),
		columns,
		getRowId: pget('id'),
		enableSorting: false,
		renderRow: ({ cells, render, row, table, handleProps }) => (
			<Fragment>
				{sortIcon(handleProps)}
				<Grid container spacing={1}>
					<Grid xs>
						<FormLabel>Points/Run</FormLabel>
						{render(cells.points)}
					</Grid>
					<Grid xs>
						<FormLabel>Oil/Run</FormLabel>
						{render(cells.oil)}
					</Grid>
					<Grid xs={5} display='flex' flexDirection='column' justifyContent='center'>
						<Typography>{cells.plays.getValue<string>()} Plays</Typography>
						<Typography>{cells.cost.getValue<string>()} Oil Cost</Typography>
					</Grid>
				</Grid>
				{deleteIcon(row, table)}
			</Fragment>
		),
	});

	return (
		<PageSection
			title='Farming'
			actions={[
				{
					name: 'Add',
					onClick: () => {
						dispatch(
							eventActions.setFarming([...farming, { id: nanoid(), points: 0, oil: 0 }]),
						);
					},
					buttonProps: { color: 'primary' },
				},
			]}>
			<DataDisplay table={table} />
		</PageSection>
	);
}
