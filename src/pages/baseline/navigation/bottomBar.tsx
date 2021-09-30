import {
	Camera as CameraIcon,
	DirectionsBoat as DirectionsBoatIcon,
	Event as EventIcon,
	Settings as SettingsIcon
} from '@mui/icons-material';
import { AppBar, Badge, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import usePageHeight from '../../../lib/hooks/usePageHeight';
import { setNewData, setTheme } from '../../../lib/store/reducers/mainReducer';

const items = [
	{ label: 'Event', icon: <EventIcon/>, link: '/' },
	{ label: 'Research', icon: <CameraIcon/>, link: '/research' },
	{ label: 'Fleet', icon: <DirectionsBoatIcon/>, link: '/fleet' },
	{ label: 'Settings', icon: <SettingsIcon/>, link: '/settings' }
];

export default function BottomBar( { children } ) {
	const main = useSelector( ( { main } ) => main );
	const dispatch = useDispatch();
	const router = useRouter();
	const height = usePageHeight();
	
	const index = React.useMemo( () => {
		for ( let i = 0; i < items.length; ++i )
			if ( items[ i ].link === router.asPath ) return i;
	}, [ router.asPath ] );
	
	return <Box>
		<Box
			position='fixed'
			top={0}
			zIndex={1100}
			width='100%'
			height='env(safe-area-inset-top)'
			bgcolor='primary.main'
		/>
		<Box width='100%' height='env(safe-area-inset-top)'/>
		<Box
			pl='env(safe-area-inset-left)'
			pr='env(safe-area-inset-right)'
			minHeight={`min(calc(100vh - 56px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height}px)`}>
			{children}
		</Box>
		<Box height='calc(env(safe-area-inset-bottom) + 56px)'/>
		<AppBar
			position='fixed'
			color='inherit'
			sx={{ top: 'auto', bottom: 0 }}>
			<BottomNavigation
				showLabels
				value={index}
				sx={{
					height: 'calc(env(safe-area-inset-bottom) + 56px)',
					pl    : 'env(safe-area-inset-left)',
					pr    : 'env(safe-area-inset-right)',
					pb    : 'env(safe-area-inset-bottom)'
				}}
				onChange={( e, value ) => {
					switch ( value ) {
					case 4:
						dispatch( setTheme( main.theme === 'dark' ? 'light' : 'dark' ) );
						break;
					default:
						router.push( items[ value ].link ).then();
						dispatch( setNewData( { [ items[ value ].link.substring( 1 ) ]: false } ) );
						break;
					}
				}}>
				{items.map( ( item, index ) => <BottomNavigationAction
					key={index}
					label={item.label}
					icon={<Badge
						color='secondary'
						variant='dot'
						invisible={!main.newData[ item.link.substring( 1 ) ]}>
						{item.icon}
					</Badge>}
				/> )}
			</BottomNavigation>
		</AppBar>
	</Box>;
}
