import { Container, Theme, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import usePageHeight from '../lib/hooks/usePageHeight';
import ActionTitle from './actionTitle';
import ScrollTop from './scrollTop';

const useStyles = makeStyles<Theme, { height: number }>( ( theme ) => ( {
	scroll   : ( { height } ) => ( {
		[ theme.breakpoints.up( 'sm' ) ]  : {
			minHeight: `min(calc(100vh - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height - 64}px)`
		},
		[ theme.breakpoints.down( 'sm' ) ]: {
			minHeight: `min(calc(100vh - 56px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height - 56}px)`
		}
	} ),
	container: {
		overflowX: 'hidden',
		minHeight: 'inherit'
	}
} ) );

export default function PageContainer( { title, children }: {
	title?: string,
	children?: React.ReactNode
} ) {
	const height = usePageHeight();
	const classes = useStyles( { height } );
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	return <div className={classes.scroll}>
		<ScrollTop/>
		<Container
			maxWidth='md'
			disableGutters={!wide}
			className={classes.container}>
			<ActionTitle title={title}/>
			{children}
		</Container>
	</div>;
}
