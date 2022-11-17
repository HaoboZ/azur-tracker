'use client';
import Page from '@/components/page';
import { useAuth } from '@/src/providers/auth';
import { useRouter } from 'next/navigation';
import EquipDrop from './equipDrop';
import OpSiWeakness from './opSiWeakness';

// noinspection JSUnusedGlobalSymbols
export default function Info() {
	const router = useRouter();
	const user = useAuth();
	
	return (
		<Page
			hideBack
			title='Info'
			titleProps={{
				actions: user?.uid === process.env.NEXT_PUBLIC_ADMIN_ID && [ {
					name   : 'Revalidate',
					onClick: () => router.refresh()
				} ]
			}}>
			<OpSiWeakness/>
			<EquipDrop/>
		</Page>
	);
}
