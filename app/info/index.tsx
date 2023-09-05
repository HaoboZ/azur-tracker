'use client';
import Page from '@/components/page';
import EquipDrop from './equipDrop';
import EquipmentTier from './equipmentTier';
import OpSiWeakness from './opSiWeakness';

// noinspection JSUnusedGlobalSymbols
export default function Info() {
	return (
		<Page hideBack title='Info'>
			<OpSiWeakness />
			<EquipmentTier />
			<EquipDrop />
		</Page>
	);
}
