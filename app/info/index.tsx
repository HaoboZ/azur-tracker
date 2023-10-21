'use client';
import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import EquipDrop from './equipDrop';
import EquipmentTier from './equipmentTier';
import OpSiWeakness from './opSiWeakness';

export default function Info() {
	return (
		<PageContainer>
			<PageTitle>Info</PageTitle>
			<OpSiWeakness />
			<EquipmentTier />
			<EquipDrop />
		</PageContainer>
	);
}
