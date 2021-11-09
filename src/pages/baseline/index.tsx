import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import { Icons } from '../../lib/icons';
import Providers from './providers';
import Wrapper from './wrapper';

export default function Baseline( { pageProps, children }: { pageProps, children?: ReactNode } ) {
	return <Providers pageProps={pageProps}>
		<CssBaseline/>
		<Icons/>
		<Wrapper>{children}</Wrapper>
	</Providers>;
}
