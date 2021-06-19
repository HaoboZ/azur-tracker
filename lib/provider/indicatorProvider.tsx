import { CircularProgress, Fade, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

type C = <T>( promise?: Promise<T> ) => Promise<T>;
const IndicatorContext = React.createContext<C>( async () => null );
IndicatorContext.displayName = 'Indicator';

const useStyles = makeStyles( ( theme: Theme ) => ( {
	progress: {
		position: 'fixed',
		zIndex  : 1500,
		bottom  : `calc(env(safe-area-inset-bottom) + ${theme.spacing()}px)`,
		right   : theme.spacing()
	}
} ) );

export default function IndicatorProvider( { children } ) {
	const classes = useStyles();
	
	const [ visible, setVisible ] = React.useState( false );
	
	React.useEffect( () => {
		if ( !visible ) return;
		function warn( e ) {
			e.returnValue = 'Currently saving, are you sure you want to leave?';
		}
		window.addEventListener( 'beforeunload', warn );
		return () => window.removeEventListener( 'beforeunload', warn );
	}, [ visible ] );
	
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
		<Fade in={visible} mountOnEnter unmountOnExit>
			<CircularProgress color='secondary' size={20} className={classes.progress}/>
		</Fade>
	</IndicatorContext.Provider>;
}

export function useIndicator() {
	return React.useContext( IndicatorContext );
}

export function withIndicator() {
	return Component => ( props ) => <IndicatorContext.Consumer>
		{( indicator ) => <Component indicator={indicator} {...props}/>}
	</IndicatorContext.Consumer>;
}
