import { CircularProgress, Fade, makeStyles } from '@material-ui/core';
import React from 'react';

type C = <T>( promise?: Promise<T> ) => Promise<T>;
const IndicatorContext = React.createContext<C>( async () => null );
IndicatorContext.displayName = 'Indicator';

const useStyles = makeStyles( {
	progress: {
		position: 'absolute',
		zIndex:   10000,
		top:      'calc(env(safe-area-inset-top) + 10px)',
		right:    10
	}
} );

export default function IndicatorProvider( { children } ) {
	const classes = useStyles();
	
	const [ visible, setVisible ] = React.useState( false );
	
	return <IndicatorContext.Provider value={async ( promise ) => {
		setVisible( true );
		if ( promise ) {
			promise.then( () => setVisible( false ) );
		} else {
			setTimeout( () => setVisible( false ), 1500 );
		}
		return await promise;
	}}>
		{children}
		<Fade in={visible}>
			<CircularProgress color='secondary' size={20} className={classes.progress}/>
		</Fade>
	</IndicatorContext.Provider>;
}

export function useIndicator() {
	return React.useContext( IndicatorContext );
}

export function withIndicator() {
	return ( Component ) => ( props ) => <IndicatorContext.Consumer>
		{( indicator ) => <Component indicator={indicator} {...props}/>}
	</IndicatorContext.Consumer>;
}
