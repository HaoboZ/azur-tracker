import prisma from '@/prisma';
import { auth } from '@/src/auth';
import pget from '@/src/helpers/pget';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { notFound } from 'next/navigation';
import { isEmpty, omit, pick, sortBy } from 'remeda';
import TierType from './index';

export default async function Page({ params }: { params: Record<string, string> }) {
	const session = await auth();
	if (session?.user.role !== 'ADMIN') notFound();

	const type = decodeURIComponent(params.type);

	const { data: tierTypesCSV } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Tier', tqx: 'out:csv', tq: `SELECT B,C WHERE A='${type}'` } },
	);
	const tierTypes = JSON.parse(`[${tierTypesCSV}]`);
	if (isEmpty(tierTypes)) return notFound();

	const { data: equipCSV } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{
			params: {
				sheet: 'Equip',
				tqx: 'out:csv',
				key: 0,
				tq: `SELECT * WHERE G='${tierTypes[0]}'${
					tierTypes[1] ? ` OR G='${tierTypes[1]}'` : ''
				}`,
			},
		},
	);

	const equipTier = await prisma.tier.findUnique({ where: { type } });

	return (
		<TierType
			type={type}
			equipTier={omit(equipTier ?? ({ t0: [], t1: [], t2: [], t3: [], t4: [], tN: [] } as any), [
				'type',
			])}
			equipData={sortBy(
				(await csvtojson().fromString(equipCSV)).map(({ id, dps, ...val }) => ({
					id: +id,
					dps: +dps,
					...val,
				})),
				pget('id'),
			)}
		/>
	);
}

export async function generateStaticParams() {
	const { data } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Tier', tqx: 'out:csv' } },
	);

	return (await csvtojson().fromString(data)).map(pick(['type']));
}
