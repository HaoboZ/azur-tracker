'use client';
import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import pget from '@/src/helpers/pget';
import { useData } from '@/src/providers/data';
import { useMemo } from 'react';
import { indexBy } from 'remeda';
import EquipmentTier from './equipmentTier';
import OpSiWeakness from './opSiWeakness';
import StageDrop from './stageDrop';
import type { FarmType } from './type';

export default function Info() {
	const { equipList } = useData<FarmType>();

	const equipIndex = useMemo(() => indexBy(equipList, pget('id')), []);

	return (
		<PageContainer>
			<PageTitle>Info</PageTitle>
			<OpSiWeakness />
			<EquipmentTier equipIndex={equipIndex} />
			<StageDrop equipIndex={equipIndex} />
		</PageContainer>
	);
}
