'use client';
import Page from '@/components/page';
import { useAuth } from '@/src/providers/auth';
import axios from 'axios';
import EquipDrop from './equipDrop';
import EquipmentTier from './equipmentTier';
import OpSiWeakness from './opSiWeakness';

// noinspection JSUnusedGlobalSymbols
export default function Info() {
	const user = useAuth();
	
	return (
		<Page
			hideBack
			title='Info'
			titleProps={{
				actions: user?.uid === process.env.NEXT_PUBLIC_ADMIN_ID && [ {
					name   : 'Revalidate',
					onClick: () => axios.get( 'api/revalidate/info' )
				} ]
			}}>
			<OpSiWeakness/>
			<EquipmentTier/>
			<EquipDrop/>
		</Page>
	);
}
