import { BrowserWindow, BrowserWindowConstructorOptions, screen } from 'electron';
import Store from 'electron-store';

export default ( windowName: string, options: BrowserWindowConstructorOptions ): BrowserWindow => {
	const key = 'window-state';
	const name = `window-state-${windowName}`;
	const store = new Store( { name } );
	const defaultSize = {
		width : options.width,
		height: options.height
	};
	
	const restore = () => store.get( key, defaultSize );
	
	const windowWithinBounds = ( windowState, bounds ) =>
		windowState.x >= bounds.x
		&& windowState.y >= bounds.y
		&& windowState.x + windowState.width <= bounds.x + bounds.width
		&& windowState.y + windowState.height <= bounds.y + bounds.height;
	
	const resetToDefaults = () => {
		const bounds = screen.getPrimaryDisplay().bounds;
		return Object.assign( {}, defaultSize, {
			x: ( bounds.width - defaultSize.width ) / 2,
			y: ( bounds.height - defaultSize.height ) / 2
		} );
	};
	
	const ensureVisibleOnSomeDisplay = ( windowState ) => {
		const visible = screen.getAllDisplays().some( ( display ) => windowWithinBounds( windowState, display.bounds ) );
		if ( !visible ) {
			// Window is partially or fully not visible now.
			// Reset it to safe defaults.
			return resetToDefaults();
		}
		return windowState;
	};
	
	const state = ensureVisibleOnSomeDisplay( restore() );
	
	const win = new BrowserWindow( {
		...options,
		...state,
		webPreferences: {
			contextIsolation: false,
			webSecurity     : false,
			...options.webPreferences
		}
	} );
	
	const getCurrentPosition = () => {
		const position = win.getPosition();
		const size = win.getSize();
		return {
			x     : position[ 0 ],
			y     : position[ 1 ],
			width : size[ 0 ],
			height: size[ 1 ]
		};
	};
	
	win.on( 'close', () => {
		if ( !win.isMinimized() && !win.isMaximized() ) {
			Object.assign( state, getCurrentPosition() );
		}
		store.set( key, state );
	} );
	
	return win;
};
