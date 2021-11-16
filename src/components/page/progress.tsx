import { GlobalStyles, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import NProgress, { NProgressOptions } from 'nprogress';
import { useEffect, useRef, useState } from 'react';

export default function PageProgress( {
	startPosition = 0.3,
	startDelayMs = 200,
	stopDelayMs = 200,
	height = 2,
	showOnShallow = true,
	options
}: {
	startPosition?: number,
	startDelayMs?: number,
	stopDelayMs?: number,
	height?: number,
	showOnShallow?: boolean,
	options?: Partial<NProgressOptions>
} ) {
	const theme = useTheme();
	const router = useRouter();
	
	const [ , setIsActive ] = useState( false );
	
	const startTimer = useRef<any>();
	const endTimer = useRef<any>();
	
	useEffect( () => {
		if ( options ) NProgress.configure( options );
		
		const clearTimers = () => {
			clearTimeout( startTimer.current );
			clearTimeout( endTimer.current );
		};
		
		const routeChangeStart = ( _, { shallow } ) => {
			if ( !shallow || showOnShallow ) {
				clearTimers();
				startTimer.current = setTimeout( () => {
					clearTimers();
					NProgress.set( startPosition );
					NProgress.start();
					setIsActive( true );
				}, startDelayMs );
			}
		};
		
		const routeChangeEnd = ( _, { shallow } ) => {
			if ( !shallow || showOnShallow ) {
				clearTimers();
				endTimer.current = setTimeout( () => {
					setIsActive( ( isActive ) => {
						if ( isActive ) NProgress.done( true );
						return false;
					} );
				}, stopDelayMs );
			}
		};
		
		router.events.on( 'routeChangeStart', routeChangeStart );
		router.events.on( 'routeChangeComplete', routeChangeEnd );
		router.events.on( 'routeChangeError', routeChangeEnd );
		return () => {
			router.events.off( 'routeChangeStart', routeChangeStart );
			router.events.off( 'routeChangeComplete', routeChangeEnd );
			router.events.off( 'routeChangeError', routeChangeEnd );
		};
	}, [ options ] );
	
	return <GlobalStyles
		styles={{
			'#nprogress': {
				pointerEvents: 'none',
				'.bar'       : {
					background: theme.palette.primary.main,
					position  : 'fixed',
					zIndex    : theme.zIndex.tooltip,
					top       : 0,
					left      : 0,
					width     : '100%',
					height    : height
				},
				'.peg': {
					display  : 'block',
					position : 'absolute',
					right    : 0,
					width    : '100%',
					height   : '100%',
					boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
					opacity  : 0.1,
					transform: 'rotate(3deg) translate(0px, -4px)'
				},
				'.spinner': {
					display : 'block',
					position: 'fixed',
					zIndex  : theme.zIndex.tooltip,
					top     : 15,
					right   : 15
				},
				'.spinner-icon': {
					width          : 18,
					height         : 18,
					boxSizing      : 'border-box',
					border         : 'solid 2px transparent',
					borderTopColor : theme.palette.primary.main,
					borderLeftColor: theme.palette.primary.main,
					borderRadius   : '50%',
					animation      : 'nprogress-spinner 400ms linear infinite'
				}
			},
			'.nprogress_custom_parent': {
				overflow    : 'hidden',
				position    : 'relative',
				'#nprogress': {
					'.spinner, .bar': {
						position: 'absolute'
					}
				}
			},
			'@keyframes nprogress-spinner': {
				'0%'  : { transform: 'rotate(0deg)' },
				'100%': { transform: 'rotate(360deg)' }
			}
		}}
	/>;
}
