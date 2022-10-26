import useWideMedia from '../../../hooks/useWideMedia';
import BottomBar from './bottomBar';
import TitleBar from './titleBar';

export default function Navigation( { children } ) {
	// useEffect( () => {
	// 	let listener: PluginListenerHandle;
	// 	( async () => {
	// 		listener = App.addListener( 'appUrlOpen', ( event ) => {
	// 			console.log( event );
	// 			// const slug = event.url.split( '.app' ).pop();
	// 			// if ( slug ) {
	// 			// 	history.push( slug );
	// 			// }
	// 		} );
	// 	} )();
	// 	return () => {
	// 		listener.remove().then();
	// 	};
	// }, [] );
	
	if ( useWideMedia() ) {
		return <TitleBar>{children}</TitleBar>;
	} else {
		return <BottomBar>{children}</BottomBar>;
	}
}
