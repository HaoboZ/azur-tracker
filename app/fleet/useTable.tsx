import { useVirtualDisplay } from '@/components/virtualDisplay';
import { useData } from '@/src/providers/data';
import { useModal } from '@/src/providers/modal';
import { Star as StarIcon } from '@mui/icons-material';
import { ListItemSecondaryAction, ListItemText } from '@mui/material';
import type { Cell } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import { Fragment, useMemo } from 'react';
import { isTruthy } from 'remeda';
import { factionColors, rarityColors, tierColors, typeColors } from '../colors';
import ShipModal from './ship/modal';
import { AffinityIcons, TierIcon } from './tierIcon';
import type { FleetType, Ship } from './type';

declare module '@tanstack/react-table' {
	interface FilterMeta {
		equip: (false | { tier?; major?; minor? })[];
	}
}

const Rarity = {
	'Decisive': 0,
	'Ultra Rare': 0,
	'Priority': 1,
	'Super Rare': 1,
	'Elite': 2,
	'Rare': 3,
	'Common': 4,
};

const columnHelper = createColumnHelper<Ship>();

export default function useFleetTable(data) {
	const { showModal } = useModal();
	const fleetData = useData<FleetType>();

	const columns = useMemo(
		() => [
			columnHelper.accessor('name', { header: 'Name', size: 40 }),
			columnHelper.accessor('rarity', {
				header: 'Rarity',
				size: 20,
				meta: {
					props: ({ getValue }: Cell<any, any>) => {
						const value = getValue();
						return { className: value && `color-${rarityColors[value]}` };
					},
				},
				sortingFn: (rowA, rowB, columnId) =>
					Rarity[rowA.getValue(columnId) as string] -
					Rarity[rowB.getValue(columnId) as string],
			}),
			columnHelper.accessor('faction', {
				header: 'Faction',
				size: 20,
				meta: {
					props: ({ getValue }: Cell<any, any>) => {
						const value = getValue();
						return { className: value && `color-${factionColors[value]}` };
					},
				},
			}),
			columnHelper.accessor('type', {
				header: 'Type',
				size: 20,
				meta: {
					props: ({ getValue }: Cell<any, any>) => {
						const value = getValue();
						return { className: value && `color-${typeColors[value]}` };
					},
				},
			}),
			columnHelper.accessor('tier', {
				header: 'Tier',
				size: 10,
				cell: ({ getValue }) => {
					const value = getValue();
					switch (value) {
						case 7:
							return '?';
						case 6:
							return 'N';
						case -1:
							return 'EX';
						default:
							return value;
					}
				},
				enableGlobalFilter: false,
			}),
			columnHelper.accessor('love', {
				header: 'Love',
				size: 10,
				cell: ({ getValue }) => AffinityIcons[getValue() as number],
				enableGlobalFilter: false,
				sortDescFirst: true,
			}),
			columnHelper.accessor('lvl', {
				header: 'Level',
				size: 10,
				cell: ({ getValue }) => {
					const value = getValue();
					return value === 126 ? <StarIcon fontSize='small' /> : value;
				},
				enableGlobalFilter: false,
				sortDescFirst: true,
			}),
			columnHelper.accessor('equip', {
				header: 'Equips',
				size: 25,
				cell: ({ getValue, row, column }) => {
					const value = getValue();
					if (row.columnFiltersMeta[column.id]) {
						const majors =
							row.columnFiltersMeta[column.id]?.equip
								.map((equip) => equip && equip.major)
								.filter(Number.isFinite) ?? [];
						const majorCount = Math.max(...majors);
						if (Number.isFinite(majorCount)) return `↑${majorCount}`;
						const minors =
							row.columnFiltersMeta[column.id]?.equip
								.map((equip) => equip && equip.minor)
								.filter(Number.isFinite) ?? [];
						const minorCount = Math.max(...minors);
						if (Number.isFinite(minorCount)) return `+${minorCount}`;
						return 'EQUIPPED';
					}
					if (!value?.some((equip) => equip[2])) return null;
					return value.map((equip, i) => <TierIcon key={i} tier={equip[2]} />);
				},
				meta: {
					props: (cell) => {
						const equip =
							cell.row.columnFiltersMeta[cell.column.id]?.equip.filter(isTruthy) ?? [];
						return {
							className: equip
								? `color-${tierColors[Math.min(...equip.map(({ tier }) => tier))]}`
								: undefined,
						};
					},
				},
				enableGlobalFilter: false,
				filterFn: (row, columnId, filterValue, addMeta) => {
					const equip = row.original.equip.map((value, index) => {
						// ships that can equip the equipment
						if (
							!fleetData.equippableData[row.original.equipType[index]]?.equip.includes(
								filterValue.type,
							)
						)
							return false;
						const tierList =
							fleetData.equipTierData[
								fleetData.equippableData[row.original.equipType[index]]?.tier
							];
						const newTier = tierList[filterValue.id],
							oldTier = tierList[value[0]];

						// is equipped already
						if (+value?.[0] === +filterValue.id) return {};
						// equip not in tier list
						if (!newTier) return false;
						// none equipped
						if (!value?.[0]) return { tier: newTier[0], major: Infinity };
						// forced BiS
						if (value[1]) return false;
						// current equip not in tier list
						if (!oldTier) return { tier: newTier[0], major: Infinity };
						if (oldTier[0] < newTier[0]) return false;
						// if higher tier
						if (oldTier[0] > newTier[0])
							return { tier: newTier[0], major: oldTier[0] - newTier[0] };
						// if same tier but better
						if (oldTier[1] > newTier[1])
							return { tier: newTier[0], minor: oldTier[1] - newTier[1] };
						return false;
					});
					addMeta({ equip });
					return equip.some(Boolean);
				},
				enableSorting: false,
			}),
		],
		[],
	);

	return useVirtualDisplay({
		data,
		columns,
		initialState: {
			sorting: [
				{ id: 'tier', desc: false },
				{ id: 'lvl', desc: true },
			],
		},
		getRowId: ({ id }) => id,
		onRowClick: (row, table) =>
			showModal(ShipModal, {
				id: 'ship',
				props: {
					ship: row.original,
					filterMeta: row.columnFiltersMeta.equip?.equip,
					selectedEquip: table.getColumn('equip').getFilterValue() as any,
					...fleetData,
				},
			}),
		renderRow: ({ cells, render }) => {
			const className = (cell) => cell.column.columnDef.meta?.className?.(cell);

			return (
				<Fragment>
					<ListItemText
						primary={
							<Fragment>
								{cells.name.getValue()}
								{' - Tier: '}
								{render(cells.tier)}
								{' - '}
								{render(cells.lvl)}
								{' / '}
								{render(cells.love)}
							</Fragment>
						}
						secondary={`${cells.rarity.getValue()} - ${cells.faction.getValue()} - ${cells.type.getValue()}`}
					/>
					<ListItemSecondaryAction className={className(cells.equip)}>
						{render(cells.equip)}
					</ListItemSecondaryAction>
				</Fragment>
			);
		},
	});
}
