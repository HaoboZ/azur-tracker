import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import Providers from './providers';
import Wrapper from './wrapper';

export default function Baseline( { pageProps, children }: { pageProps, children?: ReactNode } ) {
	return <Providers pageProps={pageProps}>
		<CssBaseline/>
		<Wrapper>{children}</Wrapper>
	</Providers>;
}
