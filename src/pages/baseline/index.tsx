import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import PageProgress from '../../components/page/progress';
import Providers from './providers';
import Wrapper from './wrapper';

export default function Baseline( { pageProps, children }: { pageProps, children?: ReactNode } ) {
	return <Providers pageProps={ pageProps }>
		<CssBaseline/>
		<PageProgress/>
		<Wrapper>{ children }</Wrapper>
	</Providers>;
}
