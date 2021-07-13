import { AppBar, Badge, BottomNavigation, BottomNavigationAction, Box } from '@material-ui/core';
import {
	Camera as CameraIcon,
	DirectionsBoat as DirectionsBoatIcon,
	Event as EventIcon,
	Home as HomeIcon
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNewData, setTheme } from '../../lib/store/reducers/mainReducer';

const items = [
	{ label: 'Home', icon: <HomeIcon/>, link: '/' },
	{ label: 'Event', icon: <EventIcon/>, link: '/event' },
	{ label: 'Research', icon: <CameraIcon/>, link: '/research' },
	{ label: 'Ship', icon: <DirectionsBoatIcon/>, link: '/ship' }
];

export default function BottomBar( { children } ) {
	const main = useSelector( state => state.main );
	const dispatch = useDispatch();
	const router = useRouter();
	
	const index = React.useMemo( () => {
		for ( let i = 0; i < items.length; ++i )
			if ( items[ i ].link === router.asPath ) return i;
	}, [ router.asPath ] );
	
	return <>
		<Box
			sx={{
				position: 'fixed',
				top     : 0,
				zIndex  : 1100,
				width   : '100%',
				height  : 'env(safe-area-inset-top)',
				bgcolor : 'primary.main'
			}}
		/>
		<Box
			sx={{
				width : '100%',
				height: 'env(safe-area-inset-top)'
			}}
		/>
		{children}
		<Box sx={{ height: 'calc(env(safe-area-inset-bottom) + 56px)' }}/>
		<AppBar
			position='fixed'
			color='inherit'
			sx={{ top: 'auto', bottom: 0 }}>
			<BottomNavigation
				showLabels
				value={index}
				sx={{
					height       : 'calc(env(safe-area-inset-bottom) + 56px)',
					paddingLeft  : 'env(safe-area-inset-left)',
					paddingRight : 'env(safe-area-inset-right)',
					paddingBottom: 'env(safe-area-inset-bottom)'
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
	</>;
}
