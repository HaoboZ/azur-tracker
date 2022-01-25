import { Backdrop, LinearProgress, linearProgressClasses, Stack, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { createContext, useContext, useEffect, useState } from 'react';
import Icon from '../../public/icons/icon-192x192.png';

type C = { setText: ( text: string ) => void, complete: () => void };
const SplashContext = createContext<C>( { setText: () => null, complete: () => null } );
SplashContext.displayName = 'Splash';

export default function SplashProvider( { children } ) {
	const dark = useMediaQuery( '(prefers-color-scheme: dark)' );
	
	const [ loading, setLoading ] = useState( true );
	const [ text, setText ] = useState( '' );
	
	return (
		<SplashContext.Provider value={{ complete: () => setLoading( false ), setText }}>
			<Backdrop appear open={loading} sx={{ zIndex: 'appBar', backgroundColor: dark ? 'black' : 'white' }}>
				<Stack alignItems='center' width={256}>
					<Image priority src={Icon} alt='icon' width={128} height={128}/>
					<Typography mt={2} mb={.5} color={dark ? 'white' : 'black'}>{text}</Typography>
					<LinearProgress
						sx={{
							width                              : '100%',
							borderRadius                       : 1,
							[ `.${linearProgressClasses.bar}` ]: { borderRadius: 1 }
						}}
					/>
				</Stack>
			</Backdrop>
			{children}
		</SplashContext.Provider>
	);
}

export function CompleteSplash() {
	const { complete } = useContext( SplashContext );
	
	useEffect( () => complete(), [] );
	
	return null;
}

export function useSplashText( text: string ) {
	const { setText } = useContext( SplashContext );
	
	useEffect( () => setText( text ), [] );
}
