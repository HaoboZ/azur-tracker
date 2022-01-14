import { Backdrop, CircularProgress, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { createContext, useContext, useEffect, useState } from 'react';
import Icon from '../../../public/icons/icon-192x192.png';

type C = () => void;
const SplashContext = createContext<C>( () => null );
SplashContext.displayName = 'Splash';

export default function SplashProvider( { children } ) {
	const dark = useMediaQuery( '(prefers-color-scheme: dark)' );
	
	const [ loading, setLoading ] = useState( true );
	
	return (
		<SplashContext.Provider value={() => setLoading( false )}>
			<Backdrop appear open={loading} sx={{ zIndex: 'tooltip', backgroundColor: dark ? 'black' : 'white' }}>
				<Stack spacing={4} alignItems='center'>
					<Image src={Icon} alt='icon' width={128} height={128}/>
					<CircularProgress/>
				</Stack>
			</Backdrop>
			{children}
		</SplashContext.Provider>
	);
}

export function CompleteSplash() {
	const completeSplash = useContext( SplashContext );
	
	useEffect( () => completeSplash(), [] );
	
	return null;
}
