import Head from 'next/head';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import EquipDrop from './equipDrop';
import OpSiWeakness from './opSiWeakness';

// noinspection JSUnusedGlobalSymbols
export default function Info() {
	return (
		<PageContainer>
			<Head><title>Info | Azur Lane Tracker</title></Head>
			<PageTitle>Info</PageTitle>
			<OpSiWeakness/>
			<EquipDrop/>
		</PageContainer>
	);
}
