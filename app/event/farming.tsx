import ActionTitle from '@/components/actionTitle';
import DataDisplay, { useDataDisplay } from '@/components/dataDisplay';
import { deleteColumn, deleteIcon } from '@/components/dataDisplay/extras/delete';
import { sortColumn, sortIcon } from '@/components/dataDisplay/extras/sort';
import FormattedTextField from '@/components/formattedTextField';
import { useData } from '@/src/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import {
	Autocomplete,
	Grid,
	ListItemSecondaryAction,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
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
	const farming = useAppSelector(({ event }) => event.farming);
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
					<Autocomplete<string, false, false, true>
						freeSolo
						autoSelect
						value={getValue().toString()}
						options={Object.keys(eventStagesData).reverse()}
						renderOption={(props, option) => (
							<MenuItem {...props}>{eventStagesData[option]}</MenuItem>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								type='number'
								inputProps={{ ...params.inputProps, inputMode: 'numeric' }}
							/>
						)}
						onChange={(e, value) =>
							dispatch(
								eventActions.modifyFarming({
									id: row.original.id,
									points: parseInt(value),
								}),
							)
						}
					/>
				),
			}),
			columnHelper.accessor('oil', {
				header: 'Oil Cost/Run',
				cell: ({ getValue, row }) => (
					<FormattedTextField
						type='number'
						inputProps={{ inputMode: 'numeric' }}
						value={getValue()}
						onChange={({ target }) =>
							dispatch(
								eventActions.modifyFarming({
									id: row.original.id,
									oil: parseInt(target.value),
								}),
							)
						}
					/>
				),
			}),
			columnHelper.accessor('plays', { header: 'Required Plays' }),
			columnHelper.accessor('cost', { header: 'Total Oil Cost' }),
			columnHelper.display(deleteColumn()),
		],
		[],
	);

	const table = useDataDisplay({
		data: farmingData,
		setData: (data) => dispatch(eventActions.setFarming(data)),
		columns,
		getRowId: ({ id }) => id,
		enableSorting: false,
		renderRow: ({ cells, render, row, table }) => (
			<Fragment>
				{sortIcon()}
				<Grid container spacing={2}>
					<Grid item xs>
						Points/Run
						{render(cells.points)}
					</Grid>
					<Grid item xs>
						Oil/Run
						{render(cells.oil)}
					</Grid>
					<Grid item xs={5} display='flex' flexDirection='column' justifyContent='center'>
						<Typography>{cells.plays.getValue<string>()} Plays</Typography>
						<Typography>{cells.cost.getValue<string>()} Oil Cost</Typography>
					</Grid>
				</Grid>
				<ListItemSecondaryAction>{deleteIcon(row, table)}</ListItemSecondaryAction>
			</Fragment>
		),
	});

	return (
		<Fragment>
			<ActionTitle
				actions={[
					{
						name: 'Add',
						onClick: () =>
							dispatch(
								eventActions.setFarming([...farming, { id: nanoid(), points: 0, oil: 0 }]),
							),
						buttonProps: { color: 'primary' },
					},
				]}>
				Farming
			</ActionTitle>
			<DataDisplay table={table} />
		</Fragment>
	);
}
