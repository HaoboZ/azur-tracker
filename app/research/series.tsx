import DataDisplay, { useDataDisplay } from '@/components/dataDisplay';
import FormattedTextField from '@/components/formattedTextField';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { researchActions } from '@/src/store/reducers/researchReducer';
import {
	Avatar,
	Grid,
	InputAdornment,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import { createColumnHelper, flexRender } from '@tanstack/react-table';
import { keyBy } from 'lodash';
import Image from 'next/image';
import { Fragment, useMemo } from 'react';
import type { ResearchShipType } from './type';

const devLevelsIndex = [
	[2, 0, 3, 0],
	[2, 2, 3, 3],
	[2, 4, 3, 6],
	[2, 6, 3, 9],
	[5, 8, 8, 12],
	[4, 13, 6, 20],
	[4, 17, 6, 26],
	[4, 21, 6, 32],
	[4, 25, 6, 38],
	[8, 29, 12, 44],
	[6, 37, 9, 56],
	[6, 43, 9, 65],
	[6, 49, 9, 74],
	[6, 55, 9, 83],
	[12, 61, 18, 92],
	[10, 73, 15, 110],
	[10, 83, 15, 125],
	[10, 93, 15, 140],
	[10, 103, 15, 155],
	[20, 113, 30, 170],
	[15, 133, 22, 200],
	[15, 148, 22, 222],
	[15, 163, 22, 244],
	[15, 178, 22, 266],
	[30, 193, 45, 288],
	[20, 223, 30, 333],
	[20, 243, 30, 363],
	[20, 263, 30, 393],
	[20, 283, 30, 423],
	[40, 303, 60, 453],
	[0, 343, 0, 513],
];

const fateLevelsIndex = [
	[10, 0, 20, 0],
	[20, 10, 30, 20],
	[30, 30, 40, 50],
	[40, 60, 50, 90],
	[65, 100, 75, 140],
	[0, 165, 0, 215],
];

const columnHelper = createColumnHelper<
	ResearchShipType & {
		devLevel?: number;
		devStage?: number;
		fateLevel?: number;
		fateStage?: number;
		devLevels: number[];
		devPrints: number;
		fatePrints: number;
	}
>();

export default function ResearchSeries({ researchShips }: { researchShips: ResearchShipType[] }) {
	const ships = useAppSelector(({ research }) => research.ships);
	const dispatch = useAppDispatch();

	const { shipData, totalPR, totalDR } = useMemo(() => {
		let totalPR = 0,
			totalDR = 0;
		const shipData = researchShips.map((item) => {
			const ship = ships[item.name] || {};
			const devLevels = devLevelsIndex[ship.devLevel || 0],
				fateLevels = fateLevelsIndex[ship.fateLevel || 0];
			const devPrints = Math.max(
				0,
				Math.floor(
					devLevelsIndex[30][item.type * 2 + 1] -
						devLevels[item.type * 2 + 1] -
						(ship.devStage || 0) / 10,
				),
			);
			const fatePrints = !item.fate
				? 0
				: Math.max(
						0,
						Math.floor(
							fateLevelsIndex[5][1] -
								fateLevels[1] -
								Math.ceil((fateLevels[0] * (ship.fateStage || 0)) / 100),
						),
				  );

			if (item.type) {
				totalDR += devPrints;
				if (item.fate) totalDR += fatePrints;
			} else {
				totalPR += devPrints;
				if (item.fate) totalPR += fatePrints;
			}
			return {
				...item,
				...ship,
				devLevels,
				devPrints,
				fatePrints,
			};
		});
		return {
			shipData,
			totalPR,
			totalDR,
		};
	}, [ships]);

	const columns = useMemo(
		() => [
			columnHelper.accessor('name', {
				header: 'Name',
				cell: ({ getValue, row }) => (
					<Fragment>
						<Avatar
							variant='rounded'
							src={row.original.image}
							sx={{
								width: 60,
								height: 60,
							}}>
							<Image
								src={row.original.image}
								alt={row.original.name}
								width={60}
								height={60}
							/>
						</Avatar>
						<Typography>{getValue()}</Typography>
					</Fragment>
				),
			}),
			columnHelper.display({
				id: 'devLevel',
				header: 'Dev Level',
				cell: ({ row }) => (
					<FormattedTextField
						type='number'
						size='small'
						inputMode='numeric'
						value={row.original.devLevel || 0}
						onChange={({ target }) =>
							dispatch(
								researchActions.modifyShip({
									ship: row.original.name,
									item: { devLevel: parseInt(target.value) },
								}),
							)
						}
					/>
				),
			}),
			columnHelper.display({
				id: 'devStage',
				header: 'Dev Stage',
				cell: ({ row }) => (
					<FormattedTextField
						type='number'
						size='small'
						inputMode='numeric'
						className='numberInput'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									/{row.original.devLevels[row.original.type * 2] * 10}
								</InputAdornment>
							),
						}}
						value={row.original.devStage || 0}
						onChange={({ target }) =>
							dispatch(
								researchActions.modifyShip({
									ship: row.original.name,
									item: { devStage: parseInt(target.value) },
									maxDev: row.original.devLevels[row.original.type * 2] * 10,
								}),
							)
						}
					/>
				),
			}),
			columnHelper.accessor('devPrints', {
				header: 'Required Prints',
				size: 1,
			}),
			columnHelper.display({
				id: 'fateLevel',
				header: 'Fate Level',
				cell: ({ row }) => {
					if (!row.original.fate) return;
					return (
						<FormattedTextField
							type='number'
							size='small'
							inputMode='numeric'
							value={row.original.fateLevel || 0}
							onChange={({ target }) =>
								dispatch(
									researchActions.modifyShip({
										ship: row.original.name,
										item: { fateLevel: parseInt(target.value) },
									}),
								)
							}
						/>
					);
				},
			}),
			columnHelper.display({
				id: 'fateStage',
				header: 'Fate Stage',
				cell: ({ row }) => {
					if (!row.original.fate) return;
					return (
						<FormattedTextField
							type='number'
							size='small'
							inputMode='numeric'
							className='numberInput'
							InputProps={{
								endAdornment: <InputAdornment position='end'>%</InputAdornment>,
							}}
							value={row.original.fateStage || 0}
							onChange={({ target }) =>
								dispatch(
									researchActions.modifyShip({
										ship: row.original.name,
										item: { fateStage: parseInt(target.value) },
									}),
								)
							}
						/>
					);
				},
			}),
			columnHelper.accessor('fatePrints', {
				header: 'Required Prints',
				size: 1,
				cell: ({ row, getValue }) => {
					if (!row.original.fate) return;
					return getValue();
				},
			}),
		],
		[],
	);

	const table = useDataDisplay({
		data: shipData,
		columns,
		enableSorting: false,
		renderRow: ({ row }) => (
			<Fragment>
				<ListItemAvatar
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}>
					<Avatar variant='rounded' src={row.original.image}>
						<Image src={row.original.image} alt={row.original.name} width={60} height={60} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={row.original.name}
					secondary={`Needs: ${row.original.devPrints + row.original.fatePrints} Prints`}
				/>
			</Fragment>
		),
		renderSubComponent: (row) => {
			const cells = keyBy(row.getVisibleCells(), 'column.id');
			return (
				<Grid container spacing={2}>
					<Grid item xs={6}>
						Dev Level:{' '}
						{flexRender(cells.devLevel.column.columnDef.cell, cells.devLevel.getContext())}
						Dev Stage:{' '}
						{flexRender(cells.devStage.column.columnDef.cell, cells.devStage.getContext())}
					</Grid>
					{Boolean(row.original.fate) && (
						<Grid item xs={6}>
							Fate Level:{' '}
							{flexRender(
								cells.fateLevel.column.columnDef.cell,
								cells.fateLevel.getContext(),
							)}
							Fate Stage:{' '}
							{flexRender(
								cells.fateStage.column.columnDef.cell,
								cells.fateStage.getContext(),
							)}
						</Grid>
					)}
				</Grid>
			);
		},
	});

	return (
		<Fragment>
			<DataDisplay table={table} />
			<Typography>Priority Prints Total: {totalPR}</Typography>
			<Typography>Decisive Prints Total: {totalDR}</Typography>
		</Fragment>
	);
}
