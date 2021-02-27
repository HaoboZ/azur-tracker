import { Container, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';

import { useTypedSelector } from '../lib/store';
import themes from '../lib/theme';
import TitleBar from './titleBar';

const useStyles = makeStyles( () => ( {
	body: { paddingTop: 10 }
} ) );

export default function Baseline( { children } ) {
	const main = useTypedSelector( store => store.main );
	
	const classes = useStyles();
	
	return <ThemeProvider theme={ themes[ main.theme ] }>
		<CssBaseline/>
		<TitleBar/>
		<Container className={ classes.body } maxWidth='md'>
			{ children }
		</Container>
	</ThemeProvider>;
}
